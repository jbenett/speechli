import React, { Component } from 'react';
import DemoInput from './components/DemoInput'
import DemoResults from './components/DemoResults'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <DemoInput />
        <DemoResults />
        <Footer />
      </div>
    );
  }
}

export default App;
