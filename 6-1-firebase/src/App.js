import firebase from "firebase";
import {Alert, Button, Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {firebase as firebaseConfig} from "./config.json";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const App = () => {
    const [showingSuccess, setShowingSuccess] = useState(false);
    const [hadError, setHadError] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        })
    }, []);

    const errorHandler = e => {
        setHadError(e);
        setTimeout(() => setHadError(null), 5000);
    }

    const successHandler = () => {
        setShowingSuccess(true);
        setTimeout(() => setShowingSuccess(false), 2000);
    }

    return (
        <div>
            <Button variant="secondary" onClick={() => firebase.auth().signOut().then(successHandler)}>Sign Out</Button>
            {user ?
                <HighScore user={user} error={errorHandler} sucess={successHandler}/>
                :
                <LogIn error={errorHandler} success={successHandler}/>
            }
            {showingSuccess && <Alert variant="success">Success!</Alert>}
            {hadError && <Alert variant="danger">Error: {hadError}</Alert>}
        </div>
    );
}

const HighScore = (props) => {
    const userIdInputField = useRef(null);

    const store = () => {
        firebase.database().ref(`users/${props.user.uid}`).set({
            highscore: userIdInputField.current.value
        })
            .then(props.sucess)
            .catch(() => props.error("Could not post highscore"));
    }

    return (
        <div>
            <h1>Firebase Score Saver</h1>
            <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control ref={userIdInputField}/>
            </Form.Group>
            <Button onClick={store}>Save score</Button>
        </div>
    )
}

const LogIn = (props) => {
    const mailRef = useRef(null);
    const passwordRef = useRef(null);

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
            .then(props.success)
            .catch(() => {
                props.error("Could not create user");
                console.error("Could not create user");
            });
    }

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
export default App;
