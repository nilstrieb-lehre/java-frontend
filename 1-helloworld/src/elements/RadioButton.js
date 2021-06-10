import {useState} from "react";

const Radio = () => {
    const [radioOption, setRadioOption] = useState(null);
    const [show, setShow] = useState(false);

    const clickHandler = e => {
        setRadioOption(e.target.value);
        setShow(false);
    }

    return (
        <div>
            <h2>Radio Button</h2>
            <input onChange={clickHandler} type="radio" id="radioOption1" name="myOptions" value="option1"/>
            <label htmlFor="radioOption1">Option 1</label>
            <br/>
            <input onChange={clickHandler} type="radio" id="radioOption2" name="myOptions" value="option2"/>
            <label htmlFor="radioOption2">Option 2</label>
            <br/>
            <input onChange={clickHandler} type="radio" id="radioOption3" name="myOptions" value="option3"/>
            <label htmlFor="radioOption3">Option 3</label>
            <br/>
            <button onClick={() => setShow(true)}>Save</button>
            {show && <div>Option: {radioOption}</div>}
        </div>
    )
}

export default Radio;