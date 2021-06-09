import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import languages from "../src/langs.json";
import AddLanguage from "./AddLanguage";


const ProgrammingLangList = () => {

        const [langs, setLangs] = useState({r: [], l: []});


        const [leftLangs, setLeftLangs] = useState([]);
        useEffect(() => {
            setLeftLangs(languages)
        }, []);

        const [rightLangs, setRightLangs] = useState([]);

        const [leftActive, setLeftActive] = useState(null);
        const [rightActive, setRightActive] = useState(null);

        const [languageAdd, setLanguageAdd] = useState(false);


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

        const addLanguage = () => setLanguageAdd(value => !value);
        const addLanguageHandler = language => {
            setLeftLangs(langs => [language, ...langs]);
            setLanguageAdd(false);
        }

        const load = i => () => {
            const left = localStorage.getItem(`${i}left`);
            const right = localStorage.getItem(`${i}right`);
            if (left) {
                setLeftLangs(JSON.parse(left));
            }
            if (right) {
                setRightLangs(JSON.parse(right));
            }
        }
        const store = i => () => {
            localStorage.setItem(`${i}left`, JSON.stringify(leftLangs));
            localStorage.setItem(`${i}right`, JSON.stringify(rightLangs));
        }

        const searchLeft = e => {
            const query = e.target.value.toLowerCase();
            setLeftLangs(left => left.map(e => ({
                ...e,
                hidden: e.name.toLowerCase().indexOf(query) === -1
            })))
        }
        const searchRight = e => {
            const query = e.target.value.toLowerCase();
            setRightLangs(left => left.map(e => ({
                ...e,
                hidden: e.name.toLowerCase().indexOf(query) === -1
            })))
        }


        return (
            <Container>
                <br/>
                <Row>
                    <Col>
                        <Form.Control onChange={searchLeft}
                                      style={{marginBottom: 10}}
                                      type="text"
                                      className="sticky-top"/>

                        <ListGroup>
                            {languageAdd &&
                            <AddLanguage key="$add-language" setHandler={addLanguageHandler}/>}
                            {leftLangs.map((l, i) => ({...l, i}))
                                .filter(l => !l.hidden)
                                .map(item =>
                                    <ListGroup.Item onClick={() => setLeftActive(item.i)} active={item.i === leftActive}
                                                    key={item.i + item.name}><Language {...item}/></ListGroup.Item>
                                )}
                        </ListGroup>
                    </Col>
                    <Col xs={1}>
                        <Container className="sticky-top">
                            <Row><Button onClick={moveAllRight} variant={"secondary"}>&gt;&gt;</Button></Row>
                            <Row><Button onClick={moveRight} variant={"secondary"}>&gt;</Button></Row>
                            <Row><Button onClick={moveLeft} variant={"secondary"}>&lt;</Button></Row>
                            <Row><Button onClick={moveAllLeft} variant={"secondary"}>&lt;&lt;</Button></Row>
                            <Row><Button onClick={deleteLeft} variant={"danger"}>L</Button></Row>
                            <Row><Button onClick={deleteRight} variant={"danger"}>R</Button></Row>
                            <Row><Button onClick={addLanguage} variant={"primary"}>New</Button></Row>
                            {
                                Array(5).fill(0).map((_, i) =>
                                    <Row key={'s' + i}><Button onClick={store(i)}
                                                               variant={"secondary"}>Store{i + 1}</Button></Row>
                                )
                            }
                            {
                                Array(5).fill(0).map((_, i) =>
                                    <Row key={'l' + i}><Button onClick={load(i)} variant={"secondary"}>Load{i + 1}</Button></Row>
                                )
                            }
                        </Container>
                    </Col>
                    <Col>
                        <Form.Control onChange={searchRight}
                                      style={{marginBottom: 10}}
                                      type="text"
                                      className="sticky-top"/>

                        <ListGroup>
                            {rightLangs.map((l, i) => ({...l, i}))
                                .filter(l => !l.hidden)
                                .map(item =>
                                    <ListGroup.Item onClick={() => setRightActive(item.i)} active={item.i === rightActive}
                                                    key={item.i + item.name}><Language {...item}/></ListGroup.Item>
                                )}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
;

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