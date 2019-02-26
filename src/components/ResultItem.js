import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Suggestion = styled.b`
  color: ${props => props.theme.primary};
`;

export default class ResultItem extends Component {
  static propTypes = {
    author: PropTypes.string,
    quote: PropTypes.string,
    original: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    removeSuggestion: PropTypes.func.isRequired,
    takeSuggestion: PropTypes.func.isRequired,
    onHoverSuggestion: PropTypes.func.isRequired
  };

  render() {
    return (
      <div
        className="result-item"
        onMouseEnter={() => {this.props.onHoverSuggestion(this.props.original);} }
        onMouseLeave={() => {this.props.onHoverSuggestion();} }
      >
        <div>
          <div className="result-options" onClick={()=>{this.props.removeSuggestion(this.props.id)} }>
            ⓧ
          </div>
          <p>
            <span className="strike-through">"{this.props.original}"</span>{" "}
          </p>
          <p>
            <Suggestion> "{this.props.quote}" </Suggestion>{" "}
          </p>
          <button type="button" onClick={()=>{ this.props.takeSuggestion(this.props.id)}}>
            Take Suggestion
          </button>
          <div className="result-profile">
            <img
              className="profile-items profile-items--image"
              src={this.props.image}
            />
            <p className="profile-items profile-items--text">
              {this.props.author}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
