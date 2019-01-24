import React, { Component } from 'react';
import { Header, Image, Menu } from 'semantic-ui-react'

class DemoHeader extends Component {
  render() {
    return (
      <div class='app-header'>
        <Image id= 'logo' width='100em' height='100em' src={require('./logo.PNG')} />
      </div>
    );
  }
}

export default DemoHeader;
