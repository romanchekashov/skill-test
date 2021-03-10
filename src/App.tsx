import React from 'react';
import './App.css';
import {TestListContainer} from "./containers/TestListContainer";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {CurrentTestLoadingContainer} from "./containers/CurrentTestLoadingContainer";
import {InputText} from "primereact/inputtext";
import {Menubar} from "primereact/menubar";

function App() {
    const items: any[] = [];
    const start: any = <Link to="/"><img alt="logo" src="logo192.png" height="40" className="p-mr-2"></img></Link>;
    const end: any = <InputText placeholder="Search" type="text"/>;

    return (
        <Router>
            <div className="App">
                <div className="card">
                    <Menubar model={items} start={start} end={end}/>
                </div>
                <Switch>
                    <Route path="/:testId" component={CurrentTestLoadingContainer}/>
                    <Route path="/" component={TestListContainer}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
