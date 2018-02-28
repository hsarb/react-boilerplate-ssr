import AppFrame from './AppFrame';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('AppFrame', () => {
  it('should render correctly', () => {
    const props = {
      children: <div />,
    };

    const wrapper = shallow(<AppFrame {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
