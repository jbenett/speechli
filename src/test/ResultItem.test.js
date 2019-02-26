import React from 'react';
import { shallow } from 'enzyme';
import ResultItem from '../components/ResultItem.js'

const myMock = jest.fn();
const clickMock =jest.fn();

describe('Result Item', () => {
  it('should render correctly', () => {
    const component = shallow(<ResultItem
      author="author"
      quote="text"
      contextPrefix=""
      original="source"
      image=""
      key="key"
      id="id"
      removeSuggestion={myMock}
      takeSuggestion={myMock}
      onHoverSuggestion={myMock}
    />);
  expect(component).toMatchSnapshot();
  });
  it('should close when the button is clicked', () => {
    const component = shallow(<ResultItem
      author="author"
      quote="text"
      contextPrefix=""
      original="source"
      image=""
      key="key"
      id="id"
      removeSuggestion={clickMock}
      takeSuggestion={myMock}
      onHoverSuggestion={myMock}
    />);
    component.find('.result-options').simulate('click');
    expect(clickMock).toHaveBeenCalled();
  })
});
