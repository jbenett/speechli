import React, { Component } from 'react';

class DemoResultItem extends Component {
  render() {
    return (
      <div className="result-item"> 
        <div>
          <div className="result-options">ⓧ</div>
          <p className="strike-through">"{ this.props.contextPrefix } { this.props.original } { this.props.contextSuffix }"</p>
          <p>"{ this.props.contextPrefix } <b> { this.props.quote } </b> { this.props.contextSuffix }"</p>
          <div className="result-profile">
            <p className="profile-items">{ this.props.author }</p>
            <img className="profile-image profile-items" src={ this.props.image }/>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoResultItem;
