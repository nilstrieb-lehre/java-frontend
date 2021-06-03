import {useRef, useState} from "react";

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
        <>
            <h2>BMI-Berechner</h2>
            <div onChange={calculateHandler} className="inputs">
                <div>Geschlecht</div>
                <div>
                    <input onClick={() => setIsMale(true)} id="gender-man" type="radio" name="gender"/>
                    <label htmlFor="gender-man">Mann</label>
                    <input onClick={() => setIsMale(false)} id="gender-women" type="radio" name="gender"/>
                    <label htmlFor="gender-women">Frau</label>
                </div>
                <br/>
                <div>Alter</div>
                <input onChange={e => setAge(e.target.value)} type="range"/>
                <div>{age}</div>
                <label htmlFor={weightField}>Ihr Gewicht (kg):</label>
                <input type="text" ref={weightField}/>
                <div>(kg)</div>
                <label htmlFor={heightField}>Ihre Körpergrösse (cm):</label>
                <input ref={heightField}/>
                <div>(cm)</div>
                <br/>
                <button onClick={calculateHandler}>Berechnen</button>
            </div>
            {result && <BMIShow bmi={result} isMale={isMale} age={age}/>}
        </>
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
            return "lightgreen";
        }
        if (bmi > 15) {
            return "yellow";
        }
        return "crimson";
    }

    return (
        <>
            <div>Dein BMI ist <div style={style}>{displayDMI}</div>
            </div>
            <progress value={progressFromBMI(props.bmi)}>test</progress>
        </>
    )
}

function progressFromBMI(bmi) {
    const lower = 10;
    const upper = 30;

    return (bmi - lower) / (upper - lower);
}

export default BMI;