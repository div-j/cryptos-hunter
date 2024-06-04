import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { makeStyles } from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    carousel:{
        height:'50%',
        display: 'flex',
        alignItems:'center'
    },
    carouselItem:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        textTransform:'uppercase',
        color:'white'


    }
})

export function numberWithComma(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
}

function Carousel() {
    const{currency, symbol} = CryptoState();
    const [trending, setTrending] = useState([])
    const classes = useStyles();

    //fecthing api
  const  fecthTrendingCoins = async ()=>{
    try {
        const response =  await fetch(TrendingCoins(currency));
          const  data = await response.json();
          setTrending(data)
    } catch (error) {
        console.log(error);
    }
           
    }
    //calling useeffect
   useEffect(() => {
     fecthTrendingCoins()
   }, [currency])
   console.log(trending);

  

//carousel items
   const items = trending.map((item)=>{
    let profit = item?.price_change_percentage_24h >=0;
    return(
        <Link className={classes.carouselItem} to={`/coins/${item.id}`}>
        <img src={item?.image}
        alt={item.name}
        height='80'
        style={{marginBottom:10}} 
        />
        <span>
            {item?.symbol}
            &nbsp;

            <span style={{color: profit>0 ?'rgb(14,203,129}':'red',  fontWeight:500}}>
                {profit && '+'}{item?.price_change_percentage_24h?.toFixed(2)}% 
            </span>
        </span>
        <span style={{fontWeight:500, fontSize:22}}>
            {symbol}{numberWithComma(item?.current_price.toFixed(2))}
        </span>
      </Link>
    )

   })

   const responsive = {
    0:{
        items:2
    },
    512:{
        items:4
    }
   }

  return (
    <div className={classes.carousel}>
        <AliceCarousel mouseTracking  infinite items={items} responsive={responsive} disableDotsControls autoPlay autoPlayInterval={1000} animationDuration={1500} />
    </div>
  )
}

export default Carousel