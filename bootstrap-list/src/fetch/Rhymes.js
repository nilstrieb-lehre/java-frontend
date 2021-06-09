import React, {useRef, useState} from 'react';
import {Button, Col, Container, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";

const Rhymes = () => {

    const [data, setData] = useState([]);

    const input = useRef(null);

    const fetchData = () => {
        fetch(`https://api.datamuse.com/words?rel_rhy=${input.current.value}`)
            .then(response => response.json())
            .then(data => setData(data));
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={5}>
                        <h1>Datamuse rhymes</h1>
                        <Form.Control ref={input} type="text"/>
                        <br/>
                        <Button onClick={fetchData} variant={"primary"}>Suchen</Button>
                        <h2>Rhymes:</h2>
                        <ListGroup>
                            {data.map(word => <ListGroupItem key={word.word}>{word.word}</ListGroupItem>)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Rhymes;