import React from 'react';
import './App.css';
import {TestListContainer} from "./containers/TestListContainer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CurrentTestLoadingContainer} from "./containers/CurrentTestLoadingContainer";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/:testId" component={CurrentTestLoadingContainer}/>
                    <Route path="/" component={TestListContainer}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
