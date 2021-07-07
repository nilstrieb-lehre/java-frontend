import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

import data from "./computer.json";

const Computer = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);


    const handleCategorySelect = (key) => () => {
        setSelectedCategory(key);
        setSelectedDevice(null);
    };

    const handleDeviceSelect = (index) => () => setSelectedDevice(index);

    const device = data[selectedCategory]?.data[selectedDevice];

    return (
        <div>
            <Container>
                <Row><h1>Computer</h1></Row>
                <Row>
                    <Col>
                        <h2>Kategorie</h2>
                        <Dropdown>
                            <Dropdown.Toggle>{data[selectedCategory]?.display || "Kategorie"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.entries(data).map(([key, category]) =>
                                    <Dropdown.Item onClick={handleCategorySelect(key)}
                                                   key={key}>{category.display}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <h2>Gerät</h2>
                        <ListGroup>
                            {selectedCategory &&
                            data[selectedCategory].data.map((device, i) =>
                                <ListGroup.Item onClick={handleDeviceSelect(i)} key={i}>{device.name}</ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                    <Col>
                        <h2>Gerätedetails</h2>
                        {device &&
                        <Card>
                            <Card.Img variant="top" src={device.image}/>
                            <Card.Body>
                                <Card.Title>{device.name}</Card.Title>
                                <Card.Text>{device.description}</Card.Text>
                                <b>Einkaufspreis: {device.purchasingPrice}</b>
                                <br/>
                                <b>Verkaufspreis: {device.price}</b>
                            </Card.Body>
                        </Card>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Computer;