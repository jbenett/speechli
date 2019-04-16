import React, { Component } from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route } from "react-router-dom";

import App from "./App";
import Moonshot from "./Moonshot";

export default class Main extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={App} />
                <Route path="/moonshot" exact component={Moonshot} />
            </Router>
        );
    }
}
