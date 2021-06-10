import {useState} from "react";

const Checkbox = () => {

    const [checkBoxes, setCheckboxes] = useState({});

    const clickHandler = e => {
        console.log("toggle")
        console.log(checkBoxes)
        setCheckboxes(cb => ({...cb, [e.target.value]: !cb[e.target.value]}));
    }

    const setAll = val => setCheckboxes({
        option1: val,
        option2: val,
        option3: val
    });

    return (
        <div>
            <h2>Checkbox</h2>
            <input onClick={clickHandler} type="checkbox"
                   checked={checkBoxes["option1"]}
                   id="radioOption1" name="myOptions" value="option1"/>
            <label htmlFor="radioOption1">Option 1</label>
            <br/>
            <input onClick={clickHandler}
                   checked={checkBoxes["option2"]}
                   type="checkbox" id="radioOption2" name="myOptions" value="option2"/>
            <label htmlFor="radioOption2">Option 2</label>
            <br/>
            <input onClick={clickHandler}
                   checked={checkBoxes["option3"]}
                   type="checkbox" id="radioOption3" name="myOptions" value="option3"/>
            <label htmlFor="radioOption3">Option 3</label>
            <br/>
            <button onClick={() => setAll(true)}>Select All</button>
            <button onClick={() => setAll(false)}> Select None</button>
            <button>Save</button>
            <br/>
        </div>
    )
}

export default Checkbox;