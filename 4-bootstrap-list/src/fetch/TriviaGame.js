import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, Container, Form, ListGroup, Row} from "react-bootstrap";

const TriviaGame = () => {
    const [points, setPoints] = useState(0);
    const [mistakes, setMistakes] = useState(0);

    const [question, setQuestion] = useState(null);

    const [questionResult, setQuestionResult] = useState(null);


    const categorySelection = useRef(null);
    const difficultySelection = useRef(null);


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
            .then(response => response.json())
            .then(data => setCategories(data.trivia_categories));
    }, []);

    const fetchQuestion = () => {
        const category = categorySelection.current.value === "Any" ? undefined : categorySelection.current.value;
        const difficulty = difficultySelection.current.value === "any" ? undefined : difficultySelection.current.value;
        const url = `https://opentdb.com/api.php?amount=1${category ? ("&category=" + category) : ""}` +
            `${difficulty ? ("&difficulty=" + difficulty) : ""}&type=multiple&encode=base64`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const res = data.results[0];
                const correctAnswer = atob(res.correct_answer);
                const incorrectAnswers = res.incorrect_answers.map(a => atob(a));
                const correctIndex = Math.floor(Math.random() * 4);
                incorrectAnswers.splice(correctIndex, 0, correctAnswer);
                setQuestion({
                    category: atob(res.category),
                    type: atob(res.type),
                    question: atob(res.question),
                    difficulty: atob(res.difficulty),
                    answers: incorrectAnswers,
                    correctIndex: correctIndex
                })
                setQuestionResult(undefined);
            })
            .catch(e => {
                setQuestion(undefined);
                setQuestionResult(undefined);
                console.error(e);
            });
    }

    const triviaHandler = correct => () => {
        if (correct) {
            setPoints(p => p + 1);
            setQuestionResult({
                correct: true
            });
        } else {
            setMistakes(m => m + 1);
            setQuestionResult({
                correct: false,
                answer: question.answers[question.correctIndex]
            })
        }
        setQuestion(undefined);
    }

    return (
        <div>
            <Container>
                <Row>
                    <h1>Trivia Game</h1>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Change Category</Form.Label>
                        <Form.Control ref={categorySelection} as="select">
                            <option value={null}>Any</option>
                            {categories.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Change Difficulty</Form.Label>
                        <Form.Control ref={difficultySelection} as="select">
                            <option>any</option>
                            <option>easy</option>
                            <option>medium</option>
                            <option>hard</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row style={{marginTop: 50}}>
                    {question && <TriviaQuestion handler={triviaHandler} {...question}/>}
                    {questionResult && <div>
                        {questionResult.correct ?
                            <Alert variant="success">Correct Answer. Points +1</Alert> :
                            <Alert variant="danger">Wrong answer. Correct Answer: {questionResult.answer}</Alert>}
                    </div>}
                </Row>
                <Row>
                    <h3>Points: {points}
                        {(points + mistakes !== 0) &&
                        <div style={{display: "inline"}}> ({Math.round(points / (points + mistakes) * 100)}% correct)
                        </div>}
                    </h3>
                    <Button onClick={fetchQuestion} variant="primary">Next Question</Button>
                </Row>
            </Container>
        </div>
    );
};

const TriviaQuestion = props => {
    return (
        <div>
            <h3>{props.question}</h3>
            <div>
                {props.answers.map((answer, i) =>
                    <ListGroup key={i}>
                        <ListGroup.Item variant={"primary"}
                                        onClick={props.handler(i === props.correctIndex)}>{answer}</ListGroup.Item>
                    </ListGroup>
                )}
            </div>
            <div>Category: {props.category}</div>
            <div>Difficulty: {props.difficulty}</div>
        </div>
    );
};


export default TriviaGame;