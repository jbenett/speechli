import React, { Component } from "react";
import PropTypes from "prop-types";

import EditorContenteditable from "./editor-contenteditable";

export default class EditorWrapper extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <EditorContenteditable />
            </div>
        );
    }
}
