import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Form, ListGroup} from "react-bootstrap";
import StationBoard from "./StationBoard";

const Sbb = () => {
    const [connections, setConnections] = useState(null);
    const [error, setError] = useState(false);
    const [from, setFrom] = useState("");


    const toInput = useRef(null);
    const fromInput = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            fetch(`http://transport.opendata.ch/v1/locations?x=${pos.coords.latitude}&y=${pos.coords.longitude}&type=station`)
                .then(response => response.json())
                .then(data => {
                    if (data.sytations) {
                        fromInput.current.value = data.stations.filter(s => s.id)[0].name;
                    }
                    setError(false);
                })
                .catch(() => setError(true))
        })
    }, [fromInput])

    const fetchConnections = () => {
        const from = fromInput.current.value;
        const to = toInput.current.value;
        fetch(`http://transport.opendata.ch/v1/connections?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
            .then(response => response.json())
            .then(data => {
                setConnections(data.connections);
                setFrom(from);
                setError(false);
            })
            .catch(() => setError(true))
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Von</Form.Label>
                <Form.Control ref={fromInput} type={"text"}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Nach</Form.Label>
                <Form.Control ref={toInput} type={"text"}/>
            </Form.Group>
            <br/>
            <Button onClick={fetchConnections}>Suchen</Button>
            <br/>
            {connections && <>
                <Connections connections={connections}/>
                <br/>
                <br/>
                <StationBoard from={from}/>
            </>}
            {error && <Alert variant="danger">Es ist ein Fehler aufgetreten. Versuche es erneut</Alert>}
        </div>
    );
};

const Connections = props => {
    return (
        <ListGroup>
            {props.connections.map((con, i) =>
                <Connection key={i} connection={con}/>
            )}
        </ListGroup>
    )
}

const Connection = props => {
    const [showSections, setShowSections] = useState(false);
    const con = props.connection;

    console.log(con)

    return (
        <ListGroup.Item>
            <div>{con.from.station.name} -> {con.to.station.name}</div>
            <div>Abfahrt: {formatTime(con.from.departure)}</div>
            <div>Ankunft: {formatTime(con.to.arrival)}</div>
            <div>Dauer: {formatSeconds(con.to.arrivalTimestamp - con.from.departureTimestamp)}</div>

            {showSections &&
            <div>
                <p>Abschnitte</p>
                <ListGroup>
                    {con.sections.map((section, i) =>
                        <Section section={section} key={i}/>
                    )}
                </ListGroup>
            </div>}

            <Button
                onClick={() => setShowSections(s => !s)}
                variant={showSections ? "primary" : "secondary"}
            >
                {showSections ? "Abschnitte Verstecken" : "Abschnitte Anzeigen"}
            </Button>
        </ListGroup.Item>
    )
}

const Section = props => {
    const [showDetails, setShowDetails] = useState(false);

    const section = props.section;
    const journey = section.journey;
    const departure = section.departure;
    const arrival = section.arrival;

    return (
        <ListGroup.Item>
            <StationName name={departure.station.name} platform={departure.platform}/>
            -> <StationName name={arrival.station.name} platform={arrival.platform}/>

            <div>
                {formatTime(new Date(departure.departure))} - {formatTime(arrival.arrival)}
            </div>
            {section.walk && <div>
                {Math.round(section.walk.duration / 60)} Minuten Fussweg
            </div>}
            {journey && <div>
                {
                    journey.category === "B" ?
                        <div>Bus {journey.number} Richtung {journey.to}</div>
                        : <div>{journey.category}{journey.number} Richtung {journey.to}</div>
                }
                {showDetails && <JourneyDetails passList={journey.passList}/>}
                <Button
                    onClick={() => setShowDetails(s => !s)}
                    variant={showDetails ? "primary" : "secondary"}
                >
                    {showDetails ? "Haltestellen Verstecken" : "Haltestellen Anzeigen"}
                </Button></div>
            }
        </ListGroup.Item>
    )
}

const JourneyDetails = props => {
    const stations = props.passList;
    return (
        <ListGroup>
            {stations.map((station, i) =>
                <ListGroup.Item key={i}>
                    {station.arrival && <div>{formatTime(station.arrival)}</div>}
                    <div><StationName name={station.station.name} platform={station.platform}/></div>
                    {station.departure && <div>{formatTime(station.departure)}</div>}
                </ListGroup.Item>)
            }
        </ListGroup>
    )
}

const StationName = props =>
    <b>
        {props.name}
        {props.platform ? <>, Gleis {props.platform}</> : ""}
    </b>

function formatTime(dateString) {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

function formatSeconds(seconds) {
    if (seconds < 60) {
        return `${seconds}`;
    }
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} min`
    }
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}h`
}

export default Sbb;