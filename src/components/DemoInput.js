import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class DemoInput extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <div class = 'input-wrapper'>
        <Form>
          <Form.Group widths='25%'>
            <Form.Field
              control={Input}
              label='Artist Name'
              placeholder='Enter Name'
            />
          </Form.Group>
          <div class = 'textarea-wrapper'>
            <Form.Field
              control={TextArea}
              label='Text'
              placeholder='Enter your text to be modified...'
            />
          </div>
          <Form.Group inline>
            <label>Make Changes?</label>
            <Form.Field
              control={Radio}
              label='Yes'
              value='1'
              checked={value === '1'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='No'
              value='2'
              checked={value === '2'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </div>
    )
  }
}

export default DemoInput;
