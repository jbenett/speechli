import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/*
 * Example Usage:
 *
 * <TagButton
 *   active={true}
 *   emoji="🐳"
 *   text="Hello World"
 *   color="blue"
 * />
 */

const ButtonWrapper = styled.div`
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 5px;
    background-color: ${props => props.color};
    opacity: ${props => (props.active ? "1.0" : "0.5")};
    transition: 100ms all;
    color: white;
    display: inline-flex;

    &:hover {
        cursor: pointer;
        opacity: 0.75;
    }

    span:nth-of-type(1) {
        margin-right: 0.5rem;
    }
`;

export default class TagButton extends Component {
    static propTypes = {
        active: PropTypes.bool,
        emoji: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    static defaultProps = {
        active: false
    };

    render() {
        const { emoji, text, ...props } = this.props;

        return (
            <ButtonWrapper className="tag-button" {...props}>
                <span>{emoji}</span>
                <span>{text}</span>
            </ButtonWrapper>
        );
    }
}
