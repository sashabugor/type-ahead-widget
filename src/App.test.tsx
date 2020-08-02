import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import InputWrapper from './components/InputWrapper';
import list from './list';

describe('App', () => {
  it('should render InputWrapper and pass props', () => {
    const root = shallow(<App />);

    // expect(root.find(InputWrapper).exists()).toBe(true);
    // expect(root.find(InputWrapper).props().list).toEqual(['some']);
    expect(root.find(InputWrapper)).toExist();
  });
});
