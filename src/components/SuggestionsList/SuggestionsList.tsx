import React from 'react';
import Fuse from 'fuse.js';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { default as MuiList } from '@material-ui/core/List';
import SuggestionsItem from './SuggestionsItem';

const styles = createStyles({
  root: {
    overflow: 'auto',
    width: '99.5%',
    height: '100%',
    maxHeight: '160px',
    border: '1px solid #2C397F',
    borderRadius: '4px',
  },
  active: {
    backgroundColor: '#00000040',
  },
});

export type Suggestion = {
  item: string;
  matches: readonly Fuse.FuseResultMatch[];
  ref?: React.RefObject<HTMLDivElement>;
};

interface Props extends WithStyles<typeof styles> {
  list: Suggestion[];
  onSuggestionSelect: (value: string) => void;
}

type State = {
  activeItemIndex: number;
};

class SuggestionsList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { activeItemIndex } = this.state;
    const { list, onSuggestionSelect } = this.props;

    if (event.keyCode === 38 && activeItemIndex > 0) {
      this.setState((prevState: State) => ({
        activeItemIndex: prevState.activeItemIndex - 1,
      }));
    }

    if (event.keyCode === 40 && activeItemIndex < list.length - 1) {
      this.setState((prevState: State) => ({
        activeItemIndex: prevState.activeItemIndex + 1,
      }));
    }

    if (event.keyCode === 13) {
      onSuggestionSelect(list[activeItemIndex].item);
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    const { list, classes, onSuggestionSelect } = this.props;
    const { activeItemIndex } = this.state;

    if (!list.length) {
      return null;
    }

    return (
      <div className={classes.root}>
        <MuiList>
          {list.map((item, index) => (
            <SuggestionsItem
              key={index}
              item={item}
              index={index}
              activeItemIndex={activeItemIndex}
              onSuggestionSelect={onSuggestionSelect}
            />
          ))}
        </MuiList>
      </div>
    );
  }
}

export default withStyles(styles)(SuggestionsList);
