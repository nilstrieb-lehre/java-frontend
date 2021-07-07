import React, {useState} from 'react';
import Modal from "react-bootstrap/modal";
import Button from "react-bootstrap/button";

const ModalShowcase = () => {
    const [showModal, setShowModal] = useState(false);
    const [savedMessage, setSavedMessage] = useState(null);
    const [options, setOptions] = useState({});


    const save = () => {
        setShowModal(false);
        setSavedMessage("Saved.")
    }

    const close = () => setShowModal(false);

    const open = () => {
        setSavedMessage(null);
        setShowModal(true);
    }

    return (
        <div>
            <Button variant="primary" onClick={open}>show</Button>
            {savedMessage && <div>{savedMessage}</div>}
            <br/>
            <br/>
            <Option name="static" setOptions={setOptions}/>
            <Option name="closeButton" setOptions={setOptions}/>
            <Option name="animation" setOptions={setOptions}/>
            <Option name="centered" setOptions={setOptions}/>
            <Option name="large" setOptions={setOptions}/>
            {/* Modal: */}
            <Modal
                backdrop={!options.static}
                animation={options.animation}
                centered={options.centered}
                size={options.large ? "lg" : "sm"}
                show={showModal}
                onHide={close}
            >
                <Modal.Header closeButton={options.closeButton}>
                    <Modal.Title>Hallo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>random body content</li>
                        <li>random body content</li>
                        <li>random body content</li>
                        <li>random body content</li>
                    </ul>
                    <Button variant="warning">Random body content</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={save}>Confirm</Button>
                    <Button variant="secondary" onClick={close}>Close</Button>
                </Modal.Footer>
            </Modal>
            <br/>
            <br/>
            <br/>
            <br/>
            {Array(100).fill(<div>..scroll...</div>)}
        </div>
    );
}

const Option = ({name, setOptions}) => {

    const changeHandler = e => {
        setOptions(old => ({...old, [name]: e.target.checked}));
    }

    return <div>
        <label htmlFor={`option-${name}`}>{name}</label>
        <input type="checkbox" onChange={changeHandler} id={`option-${name}`}/>
    </div>
}

export default ModalShowcase;