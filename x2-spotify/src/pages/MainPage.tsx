import React, {useEffect, useState} from 'react';
import {Alert, ListGroup} from "react-bootstrap";
import PlaylistPage from "./PlaylistPage";
import Api from "../SpotifyAPI";


type SimplePlaylist = SpotifyApi.PlaylistObjectSimplified;
type Playlist = SpotifyApi.SinglePlaylistResponse;

const MainPage = (props: { token: string }) => {
    const [playlists, setPlaylists] = useState<SimplePlaylist[] | null>(null);
    const [selection, setSelection] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        Api.setAccessToken(props.token);
    }, [props.token]);

    const errorHandler = (e: any) => {
        if (e.status === 401) {
            setError("Token expired. Refresh the page to log in again.");
            delete sessionStorage.token;
        } else if (e.status === 429) {
            console.log(e)
            setError("You are being ratelimited. Try it again later");
        }
    }

    useEffect(() => {
        Api.getUserPlaylists()
            .then(playlists => {
                setPlaylists(playlists.items);
                setError(null);
            })
            .catch(errorHandler);
    }, []);

    const selectPlaylist = (i: number) => () => {
        setSelection(i);
    }

    return (
        <div>
            {error && <Alert variant="danger">An error occurred: {error}</Alert>}

            <div>
                {playlists ?
                    <>
                        {
                            selection !== null ?
                                <PlaylistPage errorHandler={errorHandler} backHandler={() => setSelection(null)}
                                              playlistId={playlists[selection].id}/>
                                :
                                <ListGroup>
                                    {playlists.map((playlist, i) =>
                                        <ListGroup.Item key={playlist.id} onClick={selectPlaylist(i)}
                                                        className="playlist-item">
                                            {playlist.name}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                        }
                    </>
                    :
                    <div>Loading...</div>
                }

            </div>
        </div>
    );
};


export type {Playlist, SimplePlaylist};
export default MainPage;