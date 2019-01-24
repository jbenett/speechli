import React, { Component } from 'react';
import { Header, Image, Menu } from 'semantic-ui-react'

class DemoHeader extends Component {
  render() {
    return (
      <div class='app-header'>
        <Image id= 'logo' width='100em' height='100em' src={require('./logo.PNG')} />
        <div class ='menu-wrapper'>
          <Menu>
            <Menu.Item
              name='editorials'
              active={true}
            >
              Home
            </Menu.Item>

            <Menu.Item name='reviews' active={false}>
              About
            </Menu.Item>
            <Menu.Item
              name='upcomingEvents'
              active={false}
            >
              $$$Support Us$$$
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default DemoHeader;
