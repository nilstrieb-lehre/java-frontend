import React, {useRef, useState} from 'react';
import {Alert, Button, Form, ListGroup} from "react-bootstrap";

const AddLanguage = props => {

    const [error, setError] = useState(false);

    const nameField = useRef(null);
    const yearField = useRef(null);
    const paradigmField = useRef(null);


    const addHandler = e => {
        let language = {
            name: nameField.current.value,
            year: yearField.current.value,
            paradigm: paradigmField.current.value
        };
        if (language && language.name && language.year && language.paradigm) {
            props.setHandler(language);
        } else {
            setError(true);
        }
    }

    return (
        <ListGroup.Item>
            <b>Add Language</b>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameField} type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control ref={yearField} type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Paradigm</Form.Label>
                <Form.Control ref={paradigmField} type="text"/>
            </Form.Group>
            <br/>
            {
                error && <Alert variant={"danger"}>Missing Parameter</Alert>
            }
            <Button onClick={addHandler}>Add</Button>
        </ListGroup.Item>
    );
};

export default AddLanguage;