import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Input from './Input/Input';
import { List } from '../list';
import SuggestionsList from './SuggestionsList/SuggestionsList';
import Search from './Search/Search';

const styles = createStyles({
  root: {
    width: '50%',
  }
});

interface Props extends WithStyles<typeof styles>{
  list: List;
}

type State = {
  isListOpen: boolean;
  inputValue: string;
};

export class InputWrapper extends React.Component<Props, State> {
  ref = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      isListOpen: false,
      inputValue: '',
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = (event: Event) => {
    if (this.ref.current && this.ref.current.contains(event.target as Node)) {
      return;
    }

    this.setState({
      isListOpen: false,
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { isListOpen } = this.state;

    this.setState({
      inputValue: event.target.value,
    });

    if (!isListOpen && event.target.value.length > 1) {
      this.setState({
        isListOpen: true,
      });
    }

    if (isListOpen && event.target.value.length <= 1) {
      this.setState({
        isListOpen: false,
      });
    }
  };

  setInputValue = (value: string) => {
    this.setState({
      inputValue: value,
      isListOpen: false,
    });
  }

  getSearchResults = () => {
    const { list } = this.props;
    const { inputValue } = this.state;
    
    return Search({ list, value: inputValue }).map(result => ({ item: result.item, matches: result.matches }));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  render() {
    const { classes } = this.props;
    const { isListOpen, inputValue } = this.state;

    return (
      <div className={classes.root}>
        <Input inputValue={inputValue} onChange={this.handleChange} />
          {isListOpen && (<div ref={this.ref}><SuggestionsList onSuggestionSelect={this.setInputValue} list={this.getSearchResults()} /></div>)}
      </div>
    );
  }
}

export default withStyles(styles)(InputWrapper);
