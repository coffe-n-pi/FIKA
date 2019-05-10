import React from 'react';
import { shallow } from 'enzyme';
import Panel from '../panel';

describe('Panel Component', () => {
  it('meaninglsess test', () => {
    expect(true).toBe(true);
  });
  it('should render without throwing an error', () => {
    expect(
      shallow(<Panel />)
        .find('div.main_panel')
        .exists(),
    ).toBe(true);
  });
});
