import React, { Component } from 'react';

class DemoInput extends Component {
  render() {
    return (
      <form class = 'input-form'>
        <label>
          Text:
          <input type="text" name="text" />
        </label>
        <label>
          Author:
          <input type="text" name="author" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default DemoInput;
