import {Alert, Col, Container, Dropdown, Row} from "react-bootstrap";
import {useState} from "react";

const people = [
    ["Dölf Designer", "Serge Sequencer", "Peter Prüfer", "Katrin Kontroller", "Fritz Frischer"],
    ["Michael Marker", "Claudia Coder", "Teo Tester", "Florian Filter"],
    ["Samuel Scripter", "Dorotea Dokumenter", "Rolf Riisser"],
];

const teams = ["Team React", "Team Serenity", "Team Actix"];

const Team = () => {
    const [selectedTeamIdx, setSelectedTeam] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const selectTeam = i => () => {
        setSelectedTeam(i);
        setSelectedPerson(null);
    };

    const selectPerson = i => () => setSelectedPerson(i);

    return (
        <Container>
            <Row><h1>Teamauswahl</h1></Row>
            <Row>
                <Dropdown>
                    <Dropdown.Toggle variant="dark">
                        Bitte eine Auswahl treffen
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {teams.map((name, i) => <Dropdown.Item as="button" key={name}
                                                               onClick={selectTeam(i)}>{name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row>
                {selectedTeamIdx !== null &&
                <Col>
                    <Row><h3>{teams[selectedTeamIdx]}</h3></Row>
                    <Row>
                        <Dropdown>
                            <Dropdown.Toggle>
                                Bitte eine Auswahl treffen
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {people[selectedTeamIdx].map((name, i) =>
                                    <Dropdown.Item as="button" key={name}
                                                   onClick={selectPerson(people[selectedTeamIdx][i])}>{name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Col>
                }
                {selectedPerson &&
                <Alert variant="secondary">Person: {selectedPerson}</Alert>}
            </Row>
        </Container>
    );
}

export default Team;
