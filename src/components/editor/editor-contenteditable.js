import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

const TitleInput = styled.input`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.fontColor.regular};
    padding: 2rem;
    margin-bottom: 0;
    font-size: 2rem;
    border: none;
    font-weight: bold;
    display: block;
    width: 100%;
    ${props => props.theme.reset.input}

    &::placeholder {
        color: ${props => props.theme.fontColor.regularPlaceholder};
    }
`;

const BodyContentEditable = styled(ContentEditable)`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.fontColor.regular};
    padding: 0 2rem 2rem;
    font-size: 1.25rem;
    margin-top: 0;
    ${props => props.theme.reset.input}
`;

export default class EditorContenteditable extends Component {
    state = {
        title: "",
        htmlContent: "",
        editing: false,
        editable: true
    };

    _placeholderHtmlContent =
        '<span style="color:#757575;">My amazing text</span>';

    _onChangeBody = e => {
        this.setState({ htmlContent: e.target.value });
        if (e.target.value[e.target.value.length - 1] === ".") {
            this._hackyHack();
        }
    };

    _onFocusBody = e => {
        this.setState({ editing: true });
    };

    _onBlurBody = e => {
        this.setState({ editing: false });
    };

    _onChangeTitle = e => {
        this.setState({
            title: e.target.value
        });
    };

    _getHtmlContent = () => {
        const { htmlContent, editing } = this.state;
        if (!editing && !htmlContent) {
            return this._placeholderHtmlContent;
        }
        return htmlContent;
    };

    _hackyHack = () => {
        const { htmlContent } = this.state;
        const [, first, last] = htmlContent.match(/(.*\s)(\w+\s\w+\s\w+)/);
        const newHtmlContent =
            first +
            `<span style="border-radius:3px;padding:5px;background-color:rgba(255,0,0,0.10);border-bottom: 3px solid rgba(255,0,0,0.45);">${last}.</span>`;
        this.setState({ htmlContent: newHtmlContent });
    };

    render() {
        const { title } = this.state;

        return (
            <div>
                <TitleInput
                    name="EditorContenteditable__Title"
                    type="text"
                    value={title}
                    onChange={this._onChangeTitle}
                    placeholder="My Lovely Title"
                />
                <BodyContentEditable
                    className="EditorContenteditable__Body"
                    tagName="pre"
                    html={this._getHtmlContent()}
                    onFocus={this._onFocusBody}
                    onBlur={this._onBlurBody}
                    onChange={this._onChangeBody}
                />
            </div>
        );
    }
}
