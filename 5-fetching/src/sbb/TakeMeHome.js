import React from 'react';
import useLocalStation from "./useLocalStation";
import {Alert, Spinner} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useSettings} from "./Settings";
import {Connections} from "./Connections";

const ignore = () => undefined;

const TakeMeHome = () => {
    const location = useLocalStation();
    const {home} = useSettings();

    return (
        <div>
            {home ?
                location ?
                    <>
                        <div>Connections from {location.name} to {home}</div>
                        <Connections from={location.name} to={home} setError={ignore}/>
                    </>
                    :
                    <>
                        <Spinner animation="border"/>
                        Fetching location info...
                    </>
                :
                <Alert variant="warning">Home not set in <NavLink to="/settings">settings</NavLink>.</Alert>
            }
        </div>
    );
};

export default TakeMeHome;