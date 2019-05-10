import React from 'react';
import { shallow } from 'enzyme';
import Header from '../header';

const setup = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};
const findTestAttr = (component, attr) => {
  const wrapper = component.find(`[test-data="${attr}"]`);
  return wrapper;
};
describe('Header Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  it('it should render the logo', () => {
    const logo = findTestAttr(component, 'logo');
    expect(logo.length).toBe(1);
  });
});
