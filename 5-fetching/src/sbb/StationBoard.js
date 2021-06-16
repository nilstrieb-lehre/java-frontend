import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Form, ListGroup} from "react-bootstrap";
import {formatTime} from "./SBB";
import useLocalStation from "./useLocalStation";

const skip = n => (_, i) => i >= n;

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
                <ListGroup>
                    {stationBoard.map((station, i) =>
                        <StationBoardEntry key={i} station={station}/>
                    )}
                </ListGroup>
            }
        </div>
    );
};

const StationBoardEntry = props => {
    const [showStops, setShowStops] = useState(false);
    const local = props.station.passList[0];

    return (
        <ListGroup.Item>
            <div>
                <b>{formatTime(local.departure)} {local.platform && <>-
                    Gleis {local.platform}</>} - {props.station.to}</b>
            </div>
            <div className="cursor-pointer" onClick={() => setShowStops(show => !show)}>
                {
                    showStops ?
                        <ListGroup>
                            {props.station.passList.filter(skip(1)).map((pass, i) =>
                                <ListGroup.Item key={i}>
                                    {pass.station.name}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        :
                        <div>Show stops</div>
                }
            </div>
        </ListGroup.Item>
    )
}

export default StationBoard;