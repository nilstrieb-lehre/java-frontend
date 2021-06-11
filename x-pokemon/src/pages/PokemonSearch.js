import {Redirect} from 'react-router-dom';
import React, {useRef, useState} from 'react';

const PokemonSearch = () => {
    const searchField = useRef(null);
    const [pokemon, setPokemon] = useState(null);

    const searchKeyDown = e => {
        if (e.keyCode === 13) {
            searchPokemon();
        }
    }

    const searchPokemon = () => {
        const name = searchField.current.value.toLowerCase();
        setPokemon(name);
    }

    return (
        <div className="pokemon-search-page app center">
            <h1>PokeInfo</h1>
            <label className="field-label" htmlFor="pokemon-search">Search Pokemon</label>
            <input className="search-field" onKeyDown={searchKeyDown} ref={searchField} id="pokemon-search"/>
            <button className="search-button" onClick={searchPokemon}>Search</button>
            {pokemon && <Redirect to={`/${pokemon}`}/>}
        </div>
    );
};

export default PokemonSearch;