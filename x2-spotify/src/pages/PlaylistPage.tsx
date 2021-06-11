import {Playlist} from "./MainPage";
import React, {useEffect, useState} from "react";
import Api from "../SpotifyAPI";
import {Button, ListGroup} from "react-bootstrap";


interface PlaylistPageProps {
    errorHandler: (e: any) => void,
    backHandler: () => void,
    playlistId: string
}

const PlaylistPage = (props: PlaylistPageProps) => {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    useEffect(() => {
        Api.getPlaylist(props.playlistId)
            .then(list => setPlaylist(list))
            .catch(props.errorHandler);
    }, [props.errorHandler, props.playlistId]);

    /* TODO Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. at PlaylistPage (http://localhost:3000/static/js/main.chunk.js:781:89)*/


    return (
        <div>
            <Button onClick={props.backHandler}>Back</Button>
            {
                playlist ?
                    <div>
                        <h2>{playlist.name}</h2>
                        <ListGroup>
                            {playlist.tracks.items.map(({track}, i) =>
                                <ListGroup.Item key={track.id}>
                                    {track.name}
                                </ListGroup.Item>)}
                        </ListGroup>
                    </div>
                    :
                    <div>Loading...</div>
            }
        </div>
    );
};

export default PlaylistPage;