import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import "./App.css";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";

const useStyles = makeStyles({
  App:{
    backgroundColor: '#14161a',
    color: 'white',
    height: '100vh',
  }
})

function App() {
  const classes = useStyles();


  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/coins/:id" Component={CoinPage} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;



