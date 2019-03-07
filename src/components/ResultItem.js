import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default class ResultItem extends Component {
  static propTypes = {
    author: PropTypes.string,
    quote: PropTypes.string,
    original: PropTypes.string,
    image: PropTypes.string,
    tone: PropTypes.string,
    id: PropTypes.string,
    removeSuggestion: PropTypes.func.isRequired,
    takeSuggestion: PropTypes.func.isRequired,
    onHoverSuggestion: PropTypes.func.isRequired
  };

  render() {
    return (
      <div
        className="result-item"
        onMouseEnter={() => {
          this.props.onHoverSuggestion(this.props.original);
        }}
        onMouseLeave={() => {
          this.props.onHoverSuggestion();
        }}
      >
        <div>
          <div
            className="result-options"
            onClick={() => {
              this.props.removeSuggestion(this.props.id);
            }}
          >
            ✖️
          </div>
          <div>
            <p className="result--tone">{this.props.tone}</p>
          </div>
          <p className="result-item__replacement">{this.props.original}</p>
          <span>&nbsp;➡️</span>
          <p className="result-item__replacing">{this.props.quote}</p>
          <div>
            <Button
              onClick={() => {
                this.props.takeSuggestion(this.props.id);
              }}
            >
              Take Suggestion
            </Button>
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
      </div>
    );
  }
}
