import React from 'react';
import { shallow } from 'enzyme';
import Fuse from 'fuse.js';
import { SuggestionsList } from './SuggestionsList';

type MockListType = {
  item: string;
  matches: readonly Fuse.FuseResultMatch[];
};

describe('SuggestionsList', () => {
  const indices = ([1, 4] as unknown) as Fuse.RangeTuple[];
  const list: MockListType[] = [
    { item: 'Banana', matches: [{ indices, value: 'Banana' }] },
    { item: 'Mango', matches: [{ indices, value: 'Mango' }] },
    { item: 'Mangosteen', matches: [{ indices, value: 'Mangosteen' }] },
  ];

  const props = {
    classes: { root: 'MOCK_CLASS' },
    onSuggestionSelect: jest.fn(),
    list,
  };

  it('should not render an empty list', () => {
    const root = shallow(<SuggestionsList {...props} list={[]} />);

    expect(root.find('div')).not.toExist();
  });

  it('should render and match snapshot', () => {
    const root = shallow(<SuggestionsList {...props} />);

    expect(root).toMatchSnapshot();
  });

  describe('handleKeyDown', () => {
    const root = shallow<SuggestionsList>(<SuggestionsList {...props} />);

    root.setState({
      activeItemIndex: 1,
    });

    it('should handle up arrow key pressed', () => {
      root.instance().handleKeyDown({ keyCode: 38 } as KeyboardEvent);

      expect(root.instance().state.activeItemIndex).toEqual(0);
    });

    it('should handle down arrow key pressed', () => {
      root.instance().handleKeyDown({ keyCode: 40 } as KeyboardEvent);

      expect(root.instance().state.activeItemIndex).toEqual(1);
    });

    it('should handle Enter key pressed', () => {
      root.instance().handleKeyDown({ keyCode: 13 } as KeyboardEvent);

      expect(props.onSuggestionSelect).toHaveBeenCalledWith('Mango');
    });
  });
});
