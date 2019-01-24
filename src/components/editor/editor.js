import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import EditorContenteditable from "./editor-contenteditable";

const EditorWrapper = styled.div`
    flex: 2 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default class Editor extends Component {
    static propTypes = {};

    render() {
        return (
            <EditorWrapper>
                <EditorContenteditable />
            </EditorWrapper>
        );
    }
}
