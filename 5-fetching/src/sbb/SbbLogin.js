import firebase from "firebase";
import {Button, Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";


const SbbLogin = (props) => {
    const mailRef = useRef(null);
    const passwordRef = useRef(null);
    const [done, setDone] = useState(false);
    const history = useHistory();

    const login = () => {
        const mail = mailRef.current.value;
        const password = mailRef.current.value;
        if (!mail || !password) {
            return;
        }
        firebase.auth()
            .signInWithEmailAndPassword(mail, password)
            .then(props.success)
            .catch(() => {
                console.error("Could not create user");
                props.error("Could not create user");
            });
    }

    const signup = () => {
        const mail = mailRef.current.value;
        const password = mailRef.current.value;
        if (!mail || !password) {
            return;
        }
        firebase.auth()
            .createUserWithEmailAndPassword(mail, password)
            .then(() => {
                props.success();
                setDone(true)
            })
            .catch(() => {
                props.error("Could not create user");
                console.error("Could not create user");
                setDone(true);
            });
    }

    useEffect(() => {
        if (done || props.user) {
            history.goBack();
        }
    }, [history, done, props.user])

    return (
        <div>
            <h2>Sign In</h2>
            <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control ref={mailRef}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef}/>
            </Form.Group>
            <Button onClick={login}>Log In</Button>
            <Button variant="secondary" onClick={signup}>Sign Up</Button>
        </div>
    );
};

export default SbbLogin;