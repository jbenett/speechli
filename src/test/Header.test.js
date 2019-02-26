import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/Header.js'

describe('Header', () => {
  it('should render correctly', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
