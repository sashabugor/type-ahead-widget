import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { default as MuiList } from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '../list';

const styles = createStyles({
  root: {
    overflow: 'auto',
    width: '99.5%',
    height: '100%',
    maxHeight: '160px',
    border: '1px solid #2C397F',
    borderRadius: '4px',
  },
});

interface Props extends WithStyles<typeof styles> {
  list: List;
  onSuggestionSelect: (value: string) => void;
}

const SuggestionsList = ({ list, classes, onSuggestionSelect }: Props) => {
  if (!list.length) {
    return null;
  }
  
  return (
    <div className={classes.root}>
      <MuiList>
        {list.map((item, index) => (
          <ListItem button key={index} onClick={() => onSuggestionSelect(item)}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </MuiList>
    </div>
  );
};

export default withStyles(styles)(SuggestionsList);
