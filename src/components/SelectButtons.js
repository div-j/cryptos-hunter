import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; // Import 'makeStyles' from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  selectedButton: {
    border: '1px solid gold',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Montsarrat',
    cursor: 'pointer',
    backgroundColor: (selected) => (selected ? 'gold' : ''), // Use empty string for default background
    color: (selected) => (selected ? 'black' : theme.palette.text.primary), // Use theme for text color
    fontWeight: (selected) => (selected ? 700 : 500),
    '&:hover': {
      backgroundColor: 'gold',
      color: 'black',
    },
    width: '22%',
  },
}));

function SelectButtons({ children, onClick, selected }) {
  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectedButton}>
      {children}
    </span>
  );
}

export default SelectButtons;
