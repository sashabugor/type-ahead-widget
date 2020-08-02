import React from 'react';
import { TextField } from '@material-ui/core';
import { shallow } from 'enzyme';
import { Input } from './Input';

describe('Input', () => {
  const props = {
    onChange: jest.fn(),
    inputValue: 'MOCK_VALUE',
    classes: { root: 'MOCK_CLASS' },
  };

  it('should render and match snapshot', () => {
    const root = shallow<Input>(<Input {...props} />);

    expect(root).toMatchSnapshot();
  });

  describe('handleKeydown', () => {
    it('should prevent default event when up or down arrow is pressed', () => {
      const preventDefault = jest.fn();
      const root = shallow<Input>(<Input {...props} />);

      root.instance().handleKeydown({ keyCode: 38, preventDefault } as unknown as KeyboardEvent);
      root.instance().handleKeydown({ keyCode: 40, preventDefault } as unknown as KeyboardEvent);
      root.instance().handleKeydown({ keyCode: 42, preventDefault } as unknown as KeyboardEvent);

      expect(preventDefault).toHaveBeenCalledTimes(2);
    });
  });

  describe('onChange', () => {
    it('should be called by TextInput onChange', () => {
      const root = shallow<Input>(<Input {...props} />);
      const element = root.find(TextField);
      element.props().onChange('EVENT_MOCK' as unknown as React.ChangeEvent<HTMLInputElement>);

      expect(props.onChange).toHaveBeenCalledWith('EVENT_MOCK');
    });
  });
});
