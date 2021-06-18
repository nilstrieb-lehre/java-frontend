import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Form, Table} from "react-bootstrap";
import useLocalStation from "./useLocalStation";
import {formatTime} from "./Connections";

const StationBoard = () => {
    const [stationBoard, setStationBoard] = useState(null);
    const [fetching, setFetching] = useState(false);

    const inputField = useRef(null);

    const localStation = useLocalStation();
    useEffect(() => {
        if (localStation && inputField.current) {
            inputField.current.value = localStation.name;
        }
    }, [localStation, inputField])

    const fetchData = () => {
        setFetching(true);
        fetch(`http://transport.opendata.ch/v1/stationboard?station=${inputField.current.value}`)
            .then(response => response.json())
            .then(data => {
                setFetching(false);
                setStationBoard(data.stationboard);
                console.log(data.stationboard)
            })
    };

    void 0;

    return (
        <div>
            <Form.Group>
                <Form.Label>Station</Form.Label>
                <Form.Control ref={inputField}/>
            </Form.Group>
            <Button onClick={fetchData}>Search</Button>
            {
                fetching &&
                <Alert variant="info">Fetching data...</Alert>
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
};

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


const secondThirdSecondLast = size => (_, i) => i === 1 || i === 2 || i === size - 2;


export default StationBoard;