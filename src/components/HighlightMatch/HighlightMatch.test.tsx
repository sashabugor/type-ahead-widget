import React from 'react';
import { shallow } from 'enzyme';
import Fuse from 'fuse.js';
import HighlightMatch from './HighlightMatch';

describe('HighlightMatch', () => {
  describe('no matches in children', () => {
    it('should render children', () => {
      const wrapper = shallow(<HighlightMatch>super</HighlightMatch>);

      const strong = wrapper.find('strong');

      expect(strong).not.toExist();

      expect(wrapper.text()).toEqual('super');
    });
  });

  describe('matches in children', () => {
    it('should highlight the match', () => {
      const matches = [
        {
          indices: [[0, 2]],
          value: 'Pas',
        },
      ] as readonly Fuse.FuseResultMatch[];

      const wrapper = shallow(
        <HighlightMatch matches={matches}>Passionfruit</HighlightMatch>,
      );
      const strong = wrapper.find('strong');

      expect(strong).toExist();
      expect(strong.text()).toEqual('Pas');

      const { children } = wrapper.props();

      expect(children).toHaveLength(3);
      expect(children[0]).toEqual('');
      expect(children[2]).toEqual('sionfruit');
    });
  });
});
