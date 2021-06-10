import React from 'react';
import {NavLink, Route, Switch, useParams} from "react-router-dom";
import PlayerAPI from './API'

const flex = {
    display: "flex",
    justifyContent: "center"
}

const Football = () => {
    return (
        <div style={flex}>
            <div>
                <h1>Rooster</h1>
                <Switch>
                    <Route exact path="/" component={Roster}/>
                    <Route path="/:id" component={Player}/>
                </Switch>
            </div>
        </div>
    );
};

const Roster = () => {
    return (
        <div>
            <h4>Full Roster 2019</h4>
            <ul>
                {PlayerAPI.all().map((player, i) =>
                    <li key={i}>
                        <NavLink to={`${player.number}`}>{player.name}</NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

const Player = () => {
    const {id} = useParams();
    const player = PlayerAPI.get(id);

    return (
        <div>
            {
                player ?
                    <div>
                        <h1>{player.name}(#{player.number})</h1>
                        <h3>Position: {player.position}</h3>
                        <p>{player.description}</p>
                        <NavLink to="/">Back</NavLink>
                    </div>
                    :
                    <div>Player not found.</div>
            }
        </div>
    )
}

export default Football;