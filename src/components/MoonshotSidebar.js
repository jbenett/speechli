import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styled from "styled-components";

const SelectWrapper = styled.div`
    padding: 1rem;
`;

export default class MoonshotSidebar extends Component {
    static propTypes = {
        displayed: PropTypes.bool,
        loading: PropTypes.bool,
        onButtonPress: PropTypes.func.isRequired,
        authorOptions: PropTypes.array,
        selectedAuthorOptions: PropTypes.array,
        onChangeAuthors: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={ "sidebar-container sidebar-displayed" }>
                <SelectWrapper>
                    <Select
                        value={this.props.selectedAuthorOptions}
                        onChange={this.props.onChangeAuthors}
                        options={this.props.authorOptions}
                        isMulti={true}
                    />
                </SelectWrapper>
                <button type="button" onClick={this.props.onButtonPress}>
                    Moonshot button
                </button>
            </div>
        );
    }
}
