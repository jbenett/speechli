import React, { Component } from "react";
import Button from "./Button";
import styled from "styled-components";

const SupprtButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    left: 15px;
`

class Footer extends Component {
    render() {
        return (
            <div>
                <SupprtButton>🤑&nbsp;Support The Boys&nbsp;🤑</SupprtButton>
            </div>
        );
    }
}

export default Footer;
