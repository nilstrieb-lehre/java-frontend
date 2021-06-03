import './App.css';
import Post from "./elements/Post";
import BMI from "./elements/BMI";
import Radio from "./elements/RadioButton";
import Checkbox from "./elements/Checkbox";
import Lists from "./elements/Lists";


const App = () =>
    <div className="App">
        <div className="App-header">
            <Lists/>
            <br/>
            <Checkbox/>
            <br/>
            <Radio/>
            <br/>
            <Post/>
            <br/>
            <BMI/>
        </div>
    </div>


export default App;