import React from 'react';
import { shallow } from 'enzyme';
import { InputWrapper } from './InputWrapper';
import Input from './Input/Input';
import SuggestionsList, { Suggestion } from './SuggestionsList/SuggestionsList';

describe('InputWrapper', () => {
  describe('Input', () => {
    it('should render and get props', () => {
      const list = ['ITEM_1'];
      const root = shallow(<InputWrapper classes={{ root: 'MOCK_CLASS' }} list={list} />);
      const element = root.find(Input);

      expect(element).toExist();
      expect(element).toHaveProp('inputValue', '');
      expect(element).toHaveProp('onChange', expect.any(Function));
    });
  });

  describe('SuggestionList', () => {
    it('should be displayed when isListOpen', () => {
      const list = ['ITEM_1'];
      const root = shallow(<InputWrapper classes={{ root: 'MOCK_CLASS' }} list={list} />);

      expect(root.find(SuggestionsList)).not.toExist();

      root.setState({
        isListOpen: true,
      });

      expect(root.find('div').at(1)).toExist();
      expect(root.find(SuggestionsList)).toExist();
      expect(root.find(SuggestionsList)).toHaveProp('onSuggestionSelect', expect.any(Function));
      expect(root.find(SuggestionsList)).toHaveProp('list', expect.any(Array));
    });
  });

  describe('handleChange', () => {
    it('should set isListOpen', () => {
      const list = ['ITEM_1'];
      const root = shallow<InputWrapper>(<InputWrapper classes={{ root: 'MOCK_CLASS' }} list={list} />);
  
      root.instance().handleChange({ target: { value: 'asa' } } as React.ChangeEvent<HTMLInputElement>);
  
      expect(root.instance().state.isListOpen).toBe(true);
    });
  });

  describe('handleOutsideClick', () => {
    it('outside click should set isListOpen to false', () => {
      const list = ['ITEM_1'];
      const root = shallow<InputWrapper>(<InputWrapper classes={{ root: 'MOCK_CLASS' }} list={list} />);

      root.setState({
        isListOpen: true,
      });
      root.instance().handleClickOutside('MOCK_EVENT' as unknown as Event);

      expect(root.instance().state.isListOpen).toBe(false);
    });
  });

  describe('setInputValue', () => {
    it('it should set inputValue and close SuggestionList', () => {
      const list = ['ITEM_1'];
      const root = shallow<InputWrapper>(<InputWrapper classes={{ root: 'MOCK_CLASS' }} list={list} />);

      root.setState({
        isListOpen: true,
      });
      root.instance().setInputValue('MOCK_VALUE');

      expect(root.instance().state).toMatchObject({ inputValue: 'MOCK_VALUE', isListOpen: false });
    });
  });

  describe('getSearchResults', () => {
    it('it should return items and matches for results', () => {
      const list = ['ITEM_1'];
      const root = shallow<InputWrapper>(<InputWrapper classes={{ root: 'MOCK_CLASS' }} list={list} />);

      const expectedResults = [{
        item: 'ITEM_1',
        matches: [{
          indices: [[ 0, 1 ]],
          value: 'ITEM_1'
        }]
      }];
      root.setState({
        inputValue: 'IT',
        isListOpen: true,
      });
      const actual = root.instance().getSearchResults();

      expect(actual).toEqual(expectedResults);
    });
  });
});