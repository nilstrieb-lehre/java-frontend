import React, {useEffect, useState} from 'react';
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import languages from "../src/langs.json";


const ProgrammingLangList = () => {

    const [leftLangs, setLeftLangs] = useState([]);
    useEffect(() => {
        setLeftLangs(languages)
    }, []);
    const [rightLangs, setRightLangs] = useState([]);

    const [leftActive, setLeftActive] = useState(null);
    const [rightActive, setRightActive] = useState(null);

    const moveAllRight = () => {
        setRightLangs([...rightLangs, ...leftLangs]);
        setLeftLangs([]);
    }
    const moveRight = () => {
        if (leftLangs[leftActive]) {
            setRightLangs([...rightLangs, leftLangs[leftActive]]);
            deleteLeft();
        }
    };
    const moveLeft = () => {
        if (rightLangs[rightActive]) {
            setLeftLangs([...leftLangs, rightLangs[rightActive]]);
            deleteRight();
        }
    };
    const moveAllLeft = () => {
        setLeftLangs([...leftLangs, ...rightLangs]);
        setRightLangs([]);
    };

    const deleteLeft = () => setLeftLangs([...leftLangs.filter((_, i) => i !== leftActive)]);
    const deleteRight = () => setRightLangs([...rightLangs.filter((_, i) => i !== rightActive)]);


    return (
        <Container>
            <br/>
            <Row>
                <Col>
                    <ListGroup>
                        {leftLangs.map((item, i) =>
                            <ListGroup.Item onClick={() => setLeftActive(i)} active={i === leftActive}
                                            key={item.name}><Language {...item}/></ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
                <Col xs={1}>
                    <Container>
                        <Row><Button onClick={moveAllRight} variant={"secondary"}>&gt;&gt;</Button></Row>
                        <Row><Button onClick={moveRight} variant={"secondary"}>&gt;</Button></Row>
                        <Row><Button onClick={moveLeft} variant={"secondary"}>&lt;</Button></Row>
                        <Row><Button onClick={moveAllLeft} variant={"secondary"}>&lt;&lt;</Button></Row>
                        <Row><Button onClick={deleteLeft} variant={"danger"}>L</Button></Row>
                        <Row><Button onClick={deleteRight} variant={"danger"}>R</Button></Row>
                    </Container>
                </Col>
                <Col>
                    <ListGroup>
                        {rightLangs.map((item, i) =>
                            <ListGroup.Item onClick={() => setRightActive(i)} active={i === rightActive}
                                            key={item.name}><Language {...item}/></ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

const Language = lang => {
    return (
        <div>
            <b>{lang.name}</b>
            <div style={{fontSize: 12}}>
                {lang.year}
                <br/>
                {lang.paradigm}
            </div>
        </div>
    )
}

export default ProgrammingLangList;