import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import Pokedex from "../PokeAPI";


const PokemonInfo = () => {
    const [pokemon, setPokemon] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const {name} = useParams();


    useEffect(() => {
        Pokedex.getPokemonByName(name)
            .then(response => {
                setPokemon(response);
                console.log(response)
            })
            .catch(() => setNotFound(true));
    }, [name]);

    return (
        <div className="pokemon-info-page app center">
            <NavLink to="/pokemon">Back to search</NavLink>
            {pokemon && <>
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <div>{pokemon.types.map(({type}, i) => type.name + (i < pokemon.types.length - 1 ? " / " : ""))}</div>
                <br/>
                <h1>Stats</h1>
                <table className="abilities">
                    <thead>
                    <tr>
                        <th>Ability</th>
                        <th>Hidden</th>
                        <th>Slot</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pokemon.abilities.map((ability) =>
                        <tr key={ability.ability.name}>
                            <td>{ability.ability.name}</td>
                            <td>{ability.hidden ? "Yes" : "No"}</td>
                            <td>{ability.slot}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <td>Height</td>
                        <td>{pokemon.height / 10} m</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{pokemon.weight / 10} kg</td>
                    </tr>
                    </tbody>
                </table>
                <Sprites sprites={pokemon.sprites}/>
            </>
            }
            {notFound &&
            <p>Pokemon '{name}' not found.</p>
            }
        </div>
    );
}


const Sprites = props =>
    <div className="center">
        <h1>Sprites</h1>
        <div>
            <img src={props.sprites.front_default} alt="Front default sprite"/>
            <img src={props.sprites.back_default} alt="Back default sprite"/>
            <img src={props.sprites.front_shiny} alt="Front shiny sprite"/>
            <img src={props.sprites.back_shiny} alt="Back shiny sprite"/>
        </div>
        <h2>Sprites in all Generations</h2>
        <div className="row">
            {Object.entries(props.sprites.versions).map(([name, generation], i) =>
                <div className="margin" key={i}>
                    <h3 key={i}>{name}</h3>
                    {Object.entries(generation).map(([edition, sprites], i) =>
                        <div key={i}>
                            <h4>{edition}</h4>
                            {Object.entries(sprites).filter(([_, img]) => typeof img === 'string').map(([spriteName, img], i) =>
                                <img src={img} alt={spriteName} key={i}/>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>


export default PokemonInfo;