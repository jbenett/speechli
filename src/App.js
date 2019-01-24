import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import DemoInput from "./components/DemoInput";
import DemoHeader from "./components/DemoHeader";
import DemoResultSidebar from "./components/DemoResultSidebar";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import "./App.css";

import theme from "./constants/theme";
import Editor from "./components/editor";

class App extends Component {
  state = {
    displaySidebar: false
  };

  _toggleSidebar = (force = null) => {
    const { displaySidebar } = this.state;
    this.setState({ displaySidebar: force !== null ? force : displaySidebar });
  };

  render() {
    const { displaySidebar } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <DemoHeader />
          <Editor toggleSidebar={this._toggleSidebar} />
          <Footer />
          <DemoResultSidebar displayed={displaySidebar} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
