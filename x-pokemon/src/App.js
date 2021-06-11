import {Route, Switch} from 'react-router-dom';
import './App.scss';
import PokemonSearch from "./pages/PokemonSearch";
import PokemonInfo from "./pages/PokemonInfo";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={PokemonSearch}/>
                <Route path="/:name" component={PokemonInfo}/>
            </Switch>
        </div>
    );
}

export default App;
