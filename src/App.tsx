import React from 'react';
import InputWrapper from './components/InputWrapper';
import list from './list';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return <InputWrapper list={list} />;
  }
}

export default App;
