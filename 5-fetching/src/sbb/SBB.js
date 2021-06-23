import React, {useEffect, useState} from 'react';
import {Alert, Button} from "react-bootstrap";
import firebase from "firebase";
import StationBoard from "./StationBoard";
import {NavLink, Route, Switch, useHistory} from "react-router-dom";
import TakeMeHome from "./TakeMeHome";
import Settings from "./Settings"
import {firebase as firebaseConfig} from "./config.json";
import SbbLogin from "./SbbLogin";
import ConnectionsPage from "./Connections";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const Sbb = () => {
    const [error, setError] = useState(false);
    const [showingSuccess, setShowingSuccess] = useState(false);
    const [user, setUser] = useState(null);

    const history = useHistory();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log(`auth state changed to ${user?.uid}`)
            setUser(user);

        })
    }, [])

    const errorHandler = (e) => {
        setError(true);
        console.error(e);
        setTimeout(() => setError(false), 3000);
    }

    const successHandler = () => {
        setShowingSuccess(true);
        setTimeout(() => setShowingSuccess(false), 2000);
    }

    const logout = () => {
        firebase.auth().signOut().then(successHandler).catch(errorHandler);
    }

    const login = () => {
        history.push("/login");
    }

    const goBack = () => {
        history.goBack();
    }

    useEffect(() => {
        if (!user) {
            login();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // user should only be logged in once
    }, [])

    return (
        <div>
            <nav>
                <NavLink className="d-inline-block nav-link" to="/connections">Connections</NavLink>
                <NavLink className="d-inline-block nav-link" to="/take-me-home">Take me home</NavLink>
                <NavLink className="d-inline-block nav-link" to="/stationboard">Stationboard</NavLink>
                <NavLink className="d-inline-block nav-link" to="/settings">Settings</NavLink>
                <Button variant="outline-secondary" className="m-1" onClick={logout}>Log out</Button>
                <Button variant="outline-primary" onClick={login}>Log in</Button>
            </nav>
            <Switch>
                <Route exact path="/">
                    <h1>SBB-App</h1>
                    <p>Use the SBB-App to find your destination!</p>
                </Route>
                <Route path="/login">
                    <SbbLogin user={user} error={errorHandler} success={successHandler}/>
                </Route>
                <Route path="/connections">
                    <ConnectionsPage user={user} errorHandler={errorHandler}/>
                </Route>
                <Route path="/stationboard">
                    <StationBoard user={user} error={errorHandler}/>
                </Route>
                <Route path="/take-me-home" component={TakeMeHome}/>
                <Route path="/settings" component={Settings}/>
                <Route>
                    <Alert variant="danger">Page not found</Alert>
                </Route>
            </Switch>
            {error && <Alert variant="danger">Es ist ein Fehler aufgetreten. Versuche es erneut</Alert>}
            {showingSuccess && <Alert variant="success">Success!</Alert>}
            <br/>
            <Button variant="outline-secondary" onClick={goBack}>Go Back</Button>
        </div>
    );
};

export default Sbb;