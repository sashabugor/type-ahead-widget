import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Suggestion } from './SuggestionsList';
import HighlightMatch from '../HighlightMatch/HighlightMatch';

const styles = createStyles({
  active: {
    backgroundColor: '#00000008',
  },
});

interface Props extends WithStyles<typeof styles> {
  item: Suggestion;
  index: number;
  activeItemIndex: number;
  onSuggestionSelect: (value: string) => void;
}

class SuggestionsItem extends React.PureComponent<Props> {
  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.isItemActive()) {
      this.scrollItemIntoView();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.activeItemIndex !== prevProps.activeItemIndex && this.isItemActive()){
      this.scrollItemIntoView();
    }
  }

  scrollItemIntoView = () => {
    this.ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  isItemActive = () => {
    const { index, activeItemIndex } = this.props;

    return activeItemIndex === index;
  }
  
  render() {
    const {
      index,
      item,
      classes,
      onSuggestionSelect,
    } = this.props;

    return (
      <div ref={this.ref}>
        <ListItem
          className={this.isItemActive() ? classes.active : null}
          button
          onClick={() => onSuggestionSelect(item.item)}
        >
          <ListItemText
            primary={
              <HighlightMatch matches={item.matches}>
                {item.item}
              </HighlightMatch>
            }
          />
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(SuggestionsItem);
