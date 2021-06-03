import React, {useState} from 'react';
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";

const ProgrammingLangList = () => {

    const [leftLangs, setLeftLangs] = useState(["Algol 58", "Java", "Haskell", "R", "Coffeescript",
        "Python", "Elixir", "C#", "LISP", "Clojure", "Scala", "Kotlin", "Groovy", "Julia"]);
    const [rightLangs, setRightLangs] = useState(["VB", "PHP", "Racket", "TypeScript", "C", "Rust",
        "Go", "APL", "GRSBPL", "C++", "Ruby", "Erlang", "F#", "Javascript"]);

    const [leftActive, setLeftActive] = useState(null);
    const [rightActive, setRightActive] = useState(null);

    const moveAllRight = () => {
        setRightLangs([...rightLangs, ...leftLangs]);
        setLeftLangs([]);
    }
    const moveRight = () => {
        if (leftLangs[leftActive]) {
            setRightLangs([...rightLangs, leftLangs[leftActive]]);
            setLeftLangs([...leftLangs.filter((_, i) => i !== leftActive)]);
        }
    };
    const moveLeft = () => {
        if (rightLangs[rightActive]) {
            setLeftLangs([...leftLangs, rightLangs[rightActive]]);
            setRightLangs([...rightLangs.filter((_, i) => i !== rightActive)]);
        }
    };
    const moveAllLeft = () => {
        setLeftLangs([...leftLangs, ...rightLangs]);
        setRightLangs([]);
    };

    return (
        <Container>
            <br/>
            <Row>
                <Col>
                    <ListGroup>
                        {leftLangs.map((item, i) =>
                            <ListGroup.Item onClick={() => setLeftActive(i)} active={i === leftActive}
                                            key={i}>{item}</ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
                <Col xs={1}>
                    <Container>
                        <Row><Button onClick={moveAllRight} variant={"secondary"}>&gt;&gt;</Button></Row>
                        <Row><Button onClick={moveRight} variant={"secondary"}>&gt;</Button></Row>
                        <Row><Button onClick={moveLeft} variant={"secondary"}>&lt;</Button></Row>
                        <Row><Button onClick={moveAllLeft} variant={"secondary"}>&lt;&lt;</Button></Row>
                    </Container>
                </Col>
                <Col>
                    <ListGroup>
                        {rightLangs.map((item, i) =>
                            <ListGroup.Item onClick={() => setRightActive(i)} active={i === rightActive}
                                            key={i}>{item}</ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
        ;
};

export default ProgrammingLangList;