import React, {useEffect, useRef, useState} from "react";
import useLocalStation from "./useLocalStation";
import firebase from "firebase";
import {Alert, Button, Form, ListGroup} from "react-bootstrap";

const first10 = (_, i) => i < 10;

const ConnectionsPage = props => {
    const [fromToInput, setFromToInput] = useState(null);
    const [lastSearches, setLastSearches] = useState([]);

    const toInput = useRef(null);
    const fromInput = useRef(null);

    const localStation = useLocalStation();

    useEffect(() => {
        if (localStation && fromInput.current) {
            fromInput.current.value = localStation.name;
        }
    }, [localStation])

    useEffect(() => {
        if (props.user) {
            firebase.database().ref(`users/${props.user.uid}`).get()
                .then(data => setLastSearches(data.val()?.lastSbbSearches?.filter(first10) ?? []))
                .catch(props.error);
        }
    }, [props.error, props.user]);

    const fetchConnections = () => {
        const from = fromInput.current.value;
        const to = toInput.current.value;
        setFromToInput({from, to});
        firebase.database().ref(`users/${props.user.uid}`).get()
            .then(data => {
                firebase.database().ref(`users/${props.user.uid}`).update({
                    lastSbbSearches: [
                        {from, to},
                        ...data.val()?.lastSbbSearches ?? [],
                    ]
                })
                    .catch(props.error);
            })
            .catch(props.error);
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
            {
                lastSearches.map((search, i) =>
                    <Button
                        onClick={() => {
                            fromInput.current.value = search.from;
                            toInput.current.value = search.to;
                            setFromToInput({from: search.from, to: search.to})
                        }}
                        key={i}
                        variant="secondary">
                        {search.from} - {search.to}
                    </Button>)
            }
            {
                fromToInput && <>
                    <Connections from={fromToInput.from} to={fromToInput.to}
                                 errorHandler={props.errorHandler}/>
                </>
            }
        </div>
    )
};

const Connections = props => {
    const [connections, setConnections] = useState(null);

    useEffect(() => {
        fetch(`http://transport.opendata.ch/v1/connections?from=${encodeURIComponent(props.from)}&to=${encodeURIComponent(props.to)}`)
            .then(response => response.json())
            .then(data => setConnections(data.connections))
            .catch(props.errorHandler);
    }, [props]);

    return (
        <ListGroup>
            {connections ?
                connections.map((con, i) =>
                    <Connection key={i} connection={con}/>
                )
                :
                <Alert variant="info">Fetching Connections...</Alert>
            }
        </ListGroup>
    )
}

const Connection = props => {
    const [showSections, setShowSections] = useState(false);
    const con = props.connection;

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

export {Connections, formatTime};
export default ConnectionsPage;
