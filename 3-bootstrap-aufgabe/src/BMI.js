import {useRef, useState} from "react";
import {Alert, Form} from "react-bootstrap";

const BMI = () => {
    const [result, setResult] = useState(undefined);

    const weightField = useRef(null);
    const heightField = useRef(null);
    const [isMale, setIsMale] = useState(true);
    const [age, setAge] = useState(50);

    function calculateHandler() {
        const weight = parseInt(weightField.current.value)
        const height = parseInt(heightField.current.value) / 100;
        const bmi = weight / (height * height);
        if (!isNaN(bmi)) {
            setResult(bmi);
        }
    }

    return (
        <div style={{backgroundColor: "white"}}>
            <h2>BMI-Berechner</h2>
            <div onChange={calculateHandler}>
                <Form>
                    <Form.Group controlId="genderGroup">
                        <Form.Label>Geschlecht</Form.Label>
                        <Form.Check onClick={() => setIsMale(true)} type="radio" label="Mann" name="gender"/>
                        <Form.Check onClick={() => setIsMale(false)} type="radio" label="Frau" name="gender"/>
                    </Form.Group>
                    <Form.Group controlId="ageGroup">
                        <Form.Label>Alter</Form.Label>
                        <Form.Control onChange={e => setAge(e.target.value)} type="range"/>
                        <div>{age}</div>
                    </Form.Group>
                    <Form.Group controlId="weightGroup">
                        <Form.Label>Ihr Gewicht (kg):</Form.Label>
                        <Form.Control ref={weightField} type="text"/>
                    </Form.Group>
                    <Form.Group controlId="heightGroup">
                        <Form.Label>Ihre Körpergrösse (cm):</Form.Label>
                        <Form.Control ref={heightField} type="text"/>
                    </Form.Group>
                </Form>
            </div>
            {
                result && <BMIShow bmi={result} isMale={isMale} age={age}/>
            }
        </div>
    )
}


function BMIShow(props) {

    const displayDMI = Math.round(props.bmi * 100) / 100;
    const style = {
        display: "inline",
        color: colorFromBMI(props.bmi)
    };

    function colorFromBMI(bmi) {
        if (!props.isMale) {
            bmi = bmi + 1;
        }
        const age = props.age;
        bmi = bmi - ((Math.min(age - 20, 45)) / 5);

        if (bmi > 30) {
            return "crimson";
        }
        if (bmi > 25) {
            return "yellow";
        }
        if (bmi > 18.5) {
            return "green";
        }
        if (bmi > 15) {
            return "yellow";
        }
        return "crimson";
    }

    return (
        <>
            <Alert variant={"success"}>Dein BMI ist <div style={style}>{displayDMI}</div>
                <br/>
                <progress value={progressFromBMI(props.bmi)}>test</progress>
            </Alert>
        </>
    )
}

function progressFromBMI(bmi) {
    const lower = 10;
    const upper = 30;

    return (bmi - lower) / (upper - lower);
}

export default BMI;