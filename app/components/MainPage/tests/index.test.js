import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import MainPage from '../index';
import messages from '../messages';

describe('<MainPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<MainPage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });
});
