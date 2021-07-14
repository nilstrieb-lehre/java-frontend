import React, {useEffect, useState} from 'react';
import {Alert, Button, ButtonGroup, Container} from "react-bootstrap";
import questions from "./trivia.json";

const CORRECT = 1;
const INCORRECT = -1;

const TriviaGame = ({category}) => {
    const [points, setPoints] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [question, setQuestion] = useState(getRandomQuestion(category));
    const [result, setResult] = useState(0);

    useEffect(() => {
        setQuestion(getRandomQuestion(category));
        setResult(0);
    }, [category]);

    const incorrectHandler = () => {
        if (!result) {
            setResult(INCORRECT);
            setMistakes(m => m + 1);
        }
    }

    const correctHandler = () => {
        if (!result) {
            setPoints(p => p + 1);
            setResult(CORRECT);
        }
    }

    const nextHandler = () => {
        if (result) {
            setQuestion(getRandomQuestion(category));
            setResult(0);
        }
    }

    return (
        <div>
            <h4>Points: {points} ({Math.round(points / ((points + mistakes || 1)) * 100)}%)</h4>

                {question && <Question question={question} correctHandler={correctHandler}
                                       incorrectHandler={incorrectHandler}/>}
            <Button onClick={nextHandler}>Next</Button>
            {
                (result === INCORRECT ?
                    <Alert variant="danger">Wrong. Correct was: {question.answers[question.correct]}</Alert>
                    : result === CORRECT && <Alert variant="success">Correct.</Alert>)
            }
        </div>
    );
};

const Question = ({question, correctHandler, incorrectHandler}) => {

    const clickHandler = i => () => {
        if (question.correct === i) {
            correctHandler();
        } else {
            incorrectHandler();
        }
    }

    return (
        <Container>
            <h3>{question.question}</h3>
            {question.answers.map((answer, i) => <Button key={i} variant="secondary" style={{display: "block"}}
                                                         onClick={clickHandler(i)}>{answer}</Button>)}
        </Container>
    )
}


function getRandomQuestion(category) {
    const randomIndex = Math.floor(Math.random() * questions[category].length);
    return shuffleAnswers(questions[category][randomIndex]);
}

function shuffleAnswers(question) {
    const randomIndex = Math.floor(Math.random() * question.incorrect.length + 1);
    const answers = [...question.incorrect];
    answers.splice(randomIndex, 0, question.correct);

    return {
        question: question.question,
        answers,
        correct: randomIndex
    }
}

export default TriviaGame;