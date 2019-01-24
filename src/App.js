import React, { Component } from "react";
import DemoInput from "./components/DemoInput";
import DemoResults from "./components/DemoResults";
import DemoHeader from "./components/DemoHeader";
import { ThemeProvider } from "styled-components";
import "./App.css";

import theme from "./constants/theme";
import Editor from "./components/editor";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <DemoHeader />
          <Editor />
          <DemoResults />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
