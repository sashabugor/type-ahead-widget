import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import InputWrapper from './components/InputWrapper';
import list from './list';

describe('App', () => {
  it('should render InputWrapper and pass props', () => {
    const root = shallow(<App />);
    const element = root.find(InputWrapper);

    expect(element).toExist();
    expect(element).toHaveProp('list', list);
  });
});
