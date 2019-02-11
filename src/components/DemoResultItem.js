import React, { Component } from "react";
import styled from "styled-components";

const Suggestion = styled.b`
  color: ${props => props.theme.primary};
`;

class DemoResultItem extends Component {
  render() {
    return (
      <div className="result-item">
        <div>
          <div className="result-options" onClick={()=>{this.props.removeSuggestion(this.props.id)} }>ⓧ</div>
          <p>
            "{this.props.contextPrefix}{" "}
            <span className="strike-through">{this.props.original}</span>{" "}
            {this.props.contextSuffix}"
          </p>
          <p>
            "{this.props.contextPrefix}{" "}
            <Suggestion> {this.props.quote} </Suggestion>{" "}
            {this.props.contextSuffix}"
          </p>
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

export default DemoResultItem;
