import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Form, Spinner, Table} from "react-bootstrap";
import firebase from "firebase";
import useLocalStation from "./useLocalStation";
import {formatTime} from "./Connections";

const StationBoard = props => {
    const [stationBoard, setStationBoard] = useState(null);
    const [fetching, setFetching] = useState(false);

    const [lastStationBoards, setLastStationBoards] = useState([]);


    const inputField = useRef(null);

    const localStation = useLocalStation();

    useEffect(() => {
        if (localStation && inputField.current) {
            inputField.current.value = localStation.name;
        }
    }, [localStation, inputField]);


    useEffect(() => {
        if (props.user) {
            firebase.database().ref(`users/${props.user.uid}`).get()
                .then(data => {
                    setLastStationBoards(data.val()?.lastStationBoards?.filter((_, i) => i < 10) ?? []);
                })
                .catch(props.error);
        }
    }, [props.error, props.user]);

    const searchStationboard = () => {
        firebase.database().ref(`users/${props.user.uid}`).get()
            .then(data => {
                console.log(data.val())
                firebase.database().ref(`users/${props.user.uid}`).update({
                    lastStationBoards: [
                        inputField.current.value,
                        ...(data.val().lastStationBoards ?? []),
                    ],
                })
                    .catch(props.error);
            })
            .catch(props.error);
        fetchData(inputField.current.value);
    };

    const fetchData = query => {
        setFetching(true);
        fetch(`http://transport.opendata.ch/v1/stationboard?station=${query}`)
            .then(response => response.json())
            .then(data => {
                setFetching(false);
                setStationBoard(data.stationboard);
                console.log(data.stationboard)
            })
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Station</Form.Label>
                <Form.Control ref={inputField}/>
            </Form.Group>
            <Button onClick={searchStationboard}>Search</Button>
            <div>
                {
                    lastStationBoards.map((search, i) =>
                        <Button variant="outline-dark" key={i} onClick={() => {
                            inputField.current.value = search;
                            fetchData(search);
                        }}>{search}</Button>)
                }
            </div>
            {
                fetching &&
                <Spinner animation={"border"}/>
            }
            {
                stationBoard &&
                <Table>
                    <thead>
                    <tr>
                        <th>Departure</th>
                        <th>Platform</th>
                        <th>To</th>
                        <th>Stops</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stationBoard.map((station, i) =>
                        <StationBoardEntry key={i} station={station}/>
                    )}
                    </tbody>
                </Table>
            }
        </div>
    );
}

const StationBoardEntry = props => {
    const passes = props.station.passList;
    const local = passes[0];

    return (
        <tr>
            <td><b>{formatTime(local.departure)}</b></td>
            <td>{local.platform}</td>
            <td>{props.station.to}</td>
            <td>
                {passes.filter(secondThirdSecondLast(passes.length)).map(pass => pass.station.name).join(", ")}
            </td>
        </tr>
    )
}

const secondThirdSecondLast = size => (_, i) =>
    i === 1 || i === 2 || i === size - 2;


export default StationBoard;