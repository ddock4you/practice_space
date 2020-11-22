import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPages";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";
import auth from "./hoc/auth";
import "./scss/style.scss";

// import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={auth(LandingPage, null)} />
                <Route path="/login" component={auth(LoginPage, false)} />
                <Route path="/register" component={auth(RegisterPage, false)} />
            </Switch>
        </Router>
    );
}

export default App;
