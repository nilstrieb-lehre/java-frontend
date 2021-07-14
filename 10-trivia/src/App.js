import {Container, Dropdown, Row} from "react-bootstrap";
import TriviaGame from "./TriviaGame";
import {useState} from "react";
import questions from "./trivia.json";

const App = () => {
    const [category, setCategory] = useState("Programming Languages");

    return (
        <Container>
            <Row><h1>Trivia Game</h1></Row>
            <Row>
                Category:
                <Dropdown>
                    <Dropdown.Toggle>{category}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {Object.keys(questions).map(name => <Dropdown.Item
                            onClick={() => setCategory(name)}>{name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row>
                <TriviaGame category={category}/>
            </Row>
        </Container>
    )
}

export default App;
