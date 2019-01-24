import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import DemoInput from './components/DemoInput'
import DemoResults from './components/DemoResults'
import DemoHeader from './components/DemoHeader'
import Footer from './components/Footer'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <DemoHeader />
        <DemoInput />
        <DemoResults />
        <Footer />
      </div>
    );
  }
}

export default App;
