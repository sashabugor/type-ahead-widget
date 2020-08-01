import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

type Props = {
  onChange: (event: React.ChangeEvent) => void,
  inputValue?: string,
};

const Input = ({ onChange, inputValue = '' }: Props) => {
  const classes = useStyles();

  return (
    <TextField
      value={inputValue}
      onChange={onChange}
      className={classes.root}
      id="outlined-basic"
      label="Search"
      variant="outlined"
    />
  );
};

export default Input;
