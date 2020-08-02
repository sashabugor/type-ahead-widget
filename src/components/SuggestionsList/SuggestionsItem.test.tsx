import React from 'react';
import { shallow } from 'enzyme';
import Fuse from 'fuse.js';
import ListItem from '@material-ui/core/ListItem';
import { SuggestionsItem } from './SuggestionsItem';

describe('SuggestionsItem', () => {
  const indices = ([1, 4] as unknown) as Fuse.RangeTuple[];
  const props = {
    item: { item: 'Banana', matches: [{ indices, value: 'Banana' }] },
    index: 2,
    activeItemIndex: 0,
    onSuggestionSelect: jest.fn(),
    classes: { active: 'MOCK_ACTIVE' },
  };

  it('should render and match snapshot', () => {
    const root = shallow<SuggestionsItem>(<SuggestionsItem {...props} />);

    expect(root).toMatchSnapshot();
  });

  it('should scroll the active item into view', () => {
    const scrollIntoView = jest.fn();
    const root = shallow<SuggestionsItem>(<SuggestionsItem {...props} />);
    root.instance().ref = {
      current: {
        scrollIntoView,
      } as unknown as HTMLDivElement,
    };
    root.setProps({
      activeItemIndex: 2,
    });

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  describe('ListItem', () => {
    it('should have className when active', () => {
      const scrollIntoView = jest.fn();
      const root = shallow<SuggestionsItem>(<SuggestionsItem {...props} />);
      root.instance().ref = {
        current: {
          scrollIntoView,
        } as unknown as HTMLDivElement,
      };
      root.setProps({
        activeItemIndex: 2,
      });

      const element = root.find(ListItem);

      expect(element).toExist();
      expect(element).toHaveProp('className', props.classes.active);
    });

    it('should handleClick', () => {
      const scrollIntoView = jest.fn();
      const root = shallow<SuggestionsItem>(<SuggestionsItem {...props} />);
      root.instance().ref = {
        current: {
          scrollIntoView,
        } as unknown as HTMLDivElement,
      };
      root.setProps({
        activeItemIndex: 2,
      });

      const element = root.find(ListItem);
      element.props().onClick('MOCK_EVENT' as unknown as React.MouseEvent<HTMLDivElement>);

      expect(props.onSuggestionSelect).toHaveBeenCalledWith(props.item.item);
    });
  });
});
