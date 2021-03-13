import React from 'react';
import './App.css';
import {TestListContainer} from "./containers/TestListContainer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CurrentTestLoadingContainer} from "./containers/CurrentTestLoadingContainer";
import {LoginContainer} from "./containers/LoginContainer";
import {HeaderMenuContainer} from "./containers/HeaderMenuContainer";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
    console.log(process.env.NODE_ENV);
    return (
        <Router>
            <div className="App">
                <LoginContainer/>
                <HeaderMenuContainer/>
                <Switch>
                    <PrivateRoute path="/:testId" component={CurrentTestLoadingContainer}/>
                    <Route path="/" component={TestListContainer}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
