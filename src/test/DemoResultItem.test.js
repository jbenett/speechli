import React from 'react';
import { shallow } from 'enzyme';
import DemoResultItem from '../components/DemoResultItem.js'

const myMock = jest.fn();
const clickMock =jest.fn();

describe('Demo Result Item', () => {
  it('should render correctly', () => {
    const component = shallow(<DemoResultItem
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
    const component = shallow(<DemoResultItem
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
