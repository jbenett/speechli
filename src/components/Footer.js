import React, { Component } from "react";
import styled from "styled-components";

const SupportUs = styled.div`
    padding: 0.5rem 0.75rem;
    background-color: white;
    border-radius: 3px;
    font-family: ${props => props.theme.fontFamily};
    font-weight: bold;
    position: absolute;
    bottom: 15px;
    left: 15px;
    transition: 150ms all;
    ${props => props.theme.dropShadow.subtle}

    &:hover {
        cursor: pointer;
        color: white;
        background-color: ${props => props.theme.primary};
        ${props => props.theme.dropShadow.regular}
    }
`;

class Footer extends Component {
    render() {
        return (
            <div>
                <SupportUs>🤑&nbsp;Support The Boys&nbsp;🤑</SupportUs>
            </div>
        );
    }
}

export default Footer;
