import React, { Component } from "react";
import { Header, Image, Menu } from "semantic-ui-react";
import styled from "styled-components";

const LogoImage = styled(Image)`
  position: absolute;
  left: 1rem;
  top: 1rem;
  background-color: white;
  border-radius: 3px;
  height: 6rem;
  width: 6rem;
  ${props => props.theme.dropShadow.subtle}
`;

class DemoHeader extends Component {
  render() {
    return (
      <div>
        <LogoImage id="logo" src={require("./logo.PNG")} />
      </div>
    );
  }
}

export default DemoHeader;
