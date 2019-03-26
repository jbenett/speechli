import React from 'react';
import { shallow } from 'enzyme';
import DocumentManager from '../components/DocumentManager.js'

const clickMock =jest.fn();

describe('DocumentManager', () => {
  it('should render correctly', () => {
    const component = shallow(<DocumentManager
      onChangeDocument={clickMock} />);
    expect(component).toMatchSnapshot();
  });
});
