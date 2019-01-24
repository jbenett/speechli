import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import DemoInput from "./components/DemoInput";
import DemoResults from "./components/DemoResults";
import DemoHeader from "./components/DemoHeader";
import Footer from "./components/Footer";
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
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
