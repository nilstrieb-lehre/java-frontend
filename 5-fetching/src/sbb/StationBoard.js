import React, {useEffect, useState} from 'react';
import {Alert, ListGroup} from "react-bootstrap";

const StationBoard = props => {
    const [stationBoard, setStationBoard] = useState(null);

    useEffect(() => {
        fetch(`http://transport.opendata.ch/v1/stationboard?station=${props.from}`)
            .then(response => response.json())
            .then(data => {
                setStationBoard(data.stationboard);
                console.log(data.stationboard)
            })
    }, [props.from]);

    return (
        <ListGroup>
            <Alert variant="info">lol</Alert>
            {/*{stationBoard.map((station, i) =>*/}
            {/*    <ListGroup.Item key={i}>*/}
            {/*        <ListGroup>*/}
            {/*            {stationBoard.passList.map((pass, i) =>*/}
            {/*                <ListGroup.Item key={i}>*/}
            {/*                    {pass.station.name}*/}
            {/*                </ListGroup.Item>*/}
            {/*            )}*/}
            {/*        </ListGroup>*/}
            {/*    </ListGroup.Item>*/}
            {/*)}*/}
        </ListGroup>
    );
};

export default StationBoard;