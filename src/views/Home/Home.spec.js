import Home from './Home';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Home', () => {
  it('should render correctly', () => {
    const props = {
      message: 'Hello world',
    };

    const wrapper = renderer.create(<Home {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
