import firebase from "firebase";
import {Alert, Button, Form} from "react-bootstrap";
import {useRef, useState} from "react";
import {firebase as firebaseConfig} from "./config.json";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
    const [showingSuccess, setShowingSuccess] = useState(false);

    const userIdInputField = useRef(null);

    const store = () => {
        firebase.database().ref(`users/${userIdInputField.current.value}`).set({
            highscore: Math.floor(Math.random() * 10)
        }).then(value => {
            console.log(value);
            setShowingSuccess(true);
            setTimeout(() => setShowingSuccess(false), 3000);
        });
    }

    return (
        <div>
            <h1>Firebase score saver</h1>
            <Form.Group>
                <Form.Label>user id</Form.Label>
                <Form.Control ref={userIdInputField}/>
            </Form.Group>
            <Button onClick={store}>Save score</Button>
            {showingSuccess &&
            <Alert variant="success">Uploaded highscore successfully</Alert>}
        </div>
    );
}

export default App;
