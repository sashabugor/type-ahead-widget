import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render and match snapshot', () => {
    const root = shallow(<App />);

    expect(root).toMatchSnapshot();
  });
});
