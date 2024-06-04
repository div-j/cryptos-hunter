import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import { numberWithComma } from "../components/Carousel";
import CoinInfo from "../components/CoinInfo";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData:{
    alignSelf:'start',
    padding:25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display:'flex',
      justifyContent:'space-around'
  },
  [theme.breakpoints.down("md")]: {
    flexDirection:'column',
    alignItems:'center',
},
[theme.breakpoints.down("md")]: {
  alignItems:'start',
}
}
}));

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  

  async function fetchCoin() {
    try {
      const response = await fetch(SingleCoin(id));
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return<LinearProgress style={{backgroundColor:'gold'}}></LinearProgress>;


  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height={200}
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle" className={classes.description}>
          {coin?.description.en.split(". ")[0]}
        </Typography>
      <div className={classes.marketData}>
        {/* Rank section */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>Rank: </Typography>&nbsp; &nbsp;
            <Typography variant="h6" style={{fontFamily:'Montsarret'}}>{coin?.market_cap_rank}</Typography>
          </span>
        {/* Current price section */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5"  className={classes.heading}>Current Price: </Typography>&nbsp; &nbsp;
            <Typography variant="h6" style={{fontFamily:'Montsarret'}}>
              {symbol}{' '}
              {numberWithComma(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
       
        {/* Market Cap section */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5"  className={classes.heading}>Market Cap: </Typography>&nbsp; &nbsp;
            <Typography variant="h6" style={{fontFamily:'Montsarret'}}>{symbol} {' '}{ numberWithComma(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
          </span>
      
      </div>
      </div>
      {/* chionInfo */}
      <CoinInfo coin={coin}/>
    </div>
  );
}

export default CoinPage;
