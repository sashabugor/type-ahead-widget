import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Input from './Input';
import { List } from '../list';
import SuggestionsList from './SuggestionsList'

const styles = createStyles({
  root: {
    width: '50%',
  }
});

interface Props extends WithStyles<typeof styles>{
  list: List;
}

type State = {
  isSearchActive: boolean;
  inputValue: string;
};

class InputWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSearchActive: false,
      inputValue: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { isSearchActive } = this.state;

    this.setInputValue(event.target.value);

    if (!isSearchActive && event.target.value.length > 2) {
      this.setState({
        isSearchActive: true,
      });
    }

    if (isSearchActive && event.target.value.length <= 2) {
      this.setState({
        isSearchActive: false,
      });
    }
  };

  setInputValue = (value: string) => {
    this.setState({
      inputValue: value,
    });
  }

  render() {
    const { classes, list } = this.props;
    const { isSearchActive, inputValue } = this.state;

    return (
      <div className={classes.root}>
        <Input inputValue={inputValue} onChange={this.handleChange} />
        {isSearchActive && (<SuggestionsList onSuggestionSelect={this.setInputValue}list={list} />)}
      </div>
    );
  }
}

export default withStyles(styles)(InputWrapper);
