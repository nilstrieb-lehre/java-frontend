import React from 'react';
import {Link, NavLink, Route} from 'react-router-dom'

const BasicRouting = () => {
    return (
        <div>
            <NavLink to="/">zurück zur main page a</NavLink>
            <Route exact path="/" component={A}/>
            <Route path="/b" component={B}/>
            <Route path="/c" component={C}/>
        </div>
    );
};

const A = () =>
    <div>
        <h1>A</h1>
        <Link to="/b">zu b</Link>
        <Link to="/c">zu c</Link>
    </div>
const B = () => <div>B</div>
const C = () => <div>C</div>

export default BasicRouting;