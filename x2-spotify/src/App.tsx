import React, {useEffect, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import config from './config.json';
import MainPage from "./pages/MainPage";
import './App.css';

const App = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromUrl = window.location.hash.split('#')[1]?.split('&')[0]?.split('=')[1];
        if (tokenFromUrl) {
            sessionStorage.token = tokenFromUrl;
            setToken(tokenFromUrl);
        } else if (sessionStorage.token) {
            setToken(sessionStorage.token);
        }
        window.location.hash = "";
    }, []);

    function login() {
        window.location.href = `https://accounts.spotify.com/authorize` +
            `?client_id=${config.clientId}` +
            // should include state for security
            `&response_type=token` +
            `&redirect_uri=${encodeURIComponent(config.redirectURI)}` +
            (config.scopes ? '&scope=' + encodeURIComponent(config.scopes) : '');
    }

    return (
        <div>
            <Container>
                <Row>
                    <h1>Spotify Playlist Sorter</h1>
                </Row>
                {token ?
                    <Row>
                        <MainPage token={token}/>
                    </Row> :
                    <Row>
                        <div>
                            <h2>You need to login with Spotify</h2>
                            <Button onClick={login} variant="primary">Login with Spotify</Button>
                        </div>
                    </Row>}
            </Container>
        </div>
    );
}

export default App;
