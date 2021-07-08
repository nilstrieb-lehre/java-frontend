import {Container, Row} from "react-bootstrap";
import {NavLink, Route, Switch} from "react-router-dom";
import LineChartShow from "./LineChartShow";
import Day from "./Day";

const App = () => (
    <Container>
        <Row>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/line">Linechart</NavLink>
            <NavLink className="nav-link" to="/day">Day</NavLink>
        </Row>
        <Row>
            <Switch>
                <Route path="/line" component={LineChartShow}/>
                <Route path="/day" component={Day}/>
            </Switch>
        </Row>
    </Container>
)


export default App;