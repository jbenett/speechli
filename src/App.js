import React, { Component } from 'react';
import DemoInput from './components/DemoInput'
import DemoResultSidebar from './components/DemoResultSidebar'
import DemoHeader from './components/DemoHeader'
import Footer from './components/Footer'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <DemoHeader />
        <DemoInput />
        <Footer />
        <DemoResultSidebar displayed={true}/>
      </div>
    );
  }
}

export default App;
 