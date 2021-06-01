import BMI from "./BMI";
import {Container} from "react-bootstrap";

function App() {
    return (
        <Container>
            <BMI/>
        </Container>
    );
}

export default App;


function bg(color) {
    return {
        backgroundColor: color
    };
}