import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPages";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";

// import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </Router>
    );
}

export default App;
