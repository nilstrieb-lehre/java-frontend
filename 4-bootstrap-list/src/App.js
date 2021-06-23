import LikeButton from "./icons/LikeButton";
import {Col, Container, Row} from "react-bootstrap";
import Stars from "./icons/Stars";

function App() {
    return (
        <div>
            {/*<ProgrammingLangList/>*/}
            <Container>
                <Col>
                    <Row>
                        <h1>Like</h1>
                        <LikeButton checked={false} onChange={v => console.log(v)}/>
                    </Row>
                    <Row>
                        <h1>Stars</h1>
                        <Stars length={5} checked={4} onChange={v => console.log(v)}/>
                    </Row>
                </Col>
            </Container>
        </div>
    )
}

export default App;
