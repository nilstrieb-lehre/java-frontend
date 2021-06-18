import React, {useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";
import firebase from "firebase";
import StationBoard from "./StationBoard";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
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

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log(`auth state changed to ${user.uid}`)
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

    return (
        <div>
            <nav>
                <NavLink className="d-inline-block nav-link" to="/connections">Connections</NavLink>
                <NavLink className="d-inline-block nav-link" to="/take-me-home">Take me home</NavLink>
                <NavLink className="d-inline-block nav-link" to="/stationboard">Stationboard</NavLink>
                <NavLink className="d-inline-block nav-link" to="/settings">Settings</NavLink>
            </nav>
            {!user && <Redirect to="/login"/>}
            <Switch>
                <Route path="/login">
                    <SbbLogin user={user} error={errorHandler} success={successHandler}/>
                </Route>
                <Route path="/connections">
                    <ConnectionsPage user={user} errorHandler={errorHandler}/>
                    {error && <Alert variant="danger">Es ist ein Fehler aufgetreten. Versuche es erneut</Alert>}
                </Route>
                <Route path="/stationboard" component={StationBoard}/>
                <Route path="/take-me-home" component={TakeMeHome}/>
                <Route path="/settings" component={Settings}/>
                <Route>
                    <Alert variant="danger">Page not found</Alert>
                </Route>
            </Switch>
            {showingSuccess && <Alert variant="success">Success!</Alert>}
        </div>
    );
};

export default Sbb;