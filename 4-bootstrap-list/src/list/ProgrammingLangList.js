import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import languagesJson from "../langs.json";
import AddLanguage from "./AddLanguage";

const isRight = lang => lang.right;
const isLeft = lang => !lang.right;

const ProgrammingLangList = () => {

    const [languages, setLangs] = useState([]);
    const [active, setActive] = useState(null);
    const [languageAdd, setLanguageAdd] = useState(false);

    useEffect(() => setLangs(languagesJson), [])

    const move = toTheRight => () => {
        if (languages[active]) {
            setLangs(langs => langs.map((e, i) =>
                (i === active) ? {...e, right: toTheRight} : e)
            );
        }
    }

    const moveAll = (toTheRight) => () => {
        setLangs(langs => langs.map(e => ({...e, right: toTheRight})));
    }

    const deleteLanguage = () => {
        setLangs(langs => langs.filter((_, i) => i !== active))
    }

    const addLanguage = () => setLanguageAdd(value => !value);

    const addLanguageHandler = language => {
        setLangs(langs => [language, ...langs]);
        setLanguageAdd(false);
        setActive(0);
    }

    const load = i => () => {
        const storedLanguages = localStorage.getItem(`languages${i}`);
        setLangs(JSON.parse(storedLanguages));
    }
    const store = i => () => {
        localStorage.setItem(`languages${i}`, JSON.stringify(languages));
    }

    const searchLeft = e => {
        const query = e.target.value.toLowerCase();
        setLangs(left => left.map(e => e.right ? e : ({
            ...e,
            hidden: e.name.toLowerCase().indexOf(query) === -1
        })))
    }
    const searchRight = e => {
        const query = e.target.value.toLowerCase();
        setLangs(left => left.map(e => e.right ? ({
            ...e,
            hidden: e.name.toLowerCase().indexOf(query) === -1
        }) : e))
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
                        {languages.map((l, i) => ({...l, i}))
                            .filter(l => !l.hidden)
                            .filter(isLeft)
                            .map(item =>
                                <ListGroup.Item onClick={() => setActive(item.i)} active={item.i === active}
                                                key={item.i + item.name}><Language {...item}/></ListGroup.Item>
                            )}
                    </ListGroup>
                </Col>
                <Col xs={1}>
                    <Container className="sticky-top">
                        <Row><Button onClick={move(true)} variant={"secondary"}>&gt;</Button></Row>
                        <Row><Button onClick={moveAll(true)} variant={"secondary"}>&gt;&gt;</Button></Row>
                        <Row><Button onClick={move(false)} variant={"secondary"}>&lt;</Button></Row>
                        <Row><Button onClick={moveAll(false)} variant={"secondary"}>&lt;&lt;</Button></Row>
                        <Row><Button onClick={deleteLanguage} variant={"danger"}>D</Button></Row>
                        <Row><Button onClick={addLanguage} variant={"primary"}>New</Button></Row>
                        {
                            Array(5).fill(0).map((_, i) =>
                                <Row key={'s' + i}><Button onClick={store(i)}
                                                           variant={"secondary"}>Store{i + 1}</Button></Row>
                            )
                        }
                        {
                            Array(5).fill(0).map((_, i) =>
                                <Row key={'l' + i}><Button onClick={load(i)}
                                                           variant={"secondary"}>Load{i + 1}</Button></Row>
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
                        {languages.map((l, i) => ({...l, i}))
                            .filter(l => !l.hidden)
                            .filter(isRight)
                            .map(item =>
                                <ListGroup.Item onClick={() => setActive(item.i)} active={item.i === active}
                                                key={item.i + item.name}><Language {...item}/></ListGroup.Item>
                            )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}


const Language = props => {
    return (
        <div>
            <b>{props.name}</b>
            <div style={{fontSize: 12}}>
                {props.year}
                <br/>
                {props.paradigm}
            </div>
        </div>
    )
}

export default ProgrammingLangList;