import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = createStyles({
  root: {
    width: '100%',
  },
});

interface Props extends WithStyles<typeof styles> {
  onChange: (event: React.ChangeEvent) => void,
  inputValue?: string,
}

export class Input extends React.PureComponent<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown, false);
  }

  handleKeydown = (event: KeyboardEvent) => {
    if (event.keyCode == 38 || event.keyCode == 40) {
      event.preventDefault();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown, false);
  }

  render() {
    const { classes, inputValue, onChange } = this.props;

    return (
      <TextField
        value={inputValue || ''}
        onChange={onChange}
        className={classes.root}
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    );
  }
}

export default withStyles(styles)(Input);
