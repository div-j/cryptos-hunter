import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { HistoricalChart } from '../config/api';
import { CircularProgress, Container, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import axios from 'axios'
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import {chartDays} from '../config/data'
import SelectButtons from './SelectButtons';

const darkTheme = createTheme({
palette:{
    primary:{
        main:'#fff',
    },
    type:'dark'
}
})

const useStyles = makeStyles((theme)=>({

    container:{
        width:'75%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
        padding:40,
        [theme.breakpoints.down('md')]:{
            with:'100%',
            marginTop:0,
            padding:20,
            paddingTop:0

        }    
    }
}))


function CoinInfo({coin}) {
const [historicalData, setHistoricalData] = useState()
const [days, setDays] = useState(1)
const {currency} = CryptoState();
const classes = useStyles()

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


   async function fetchChartData(){
        try {
            let {data} = await axios.get(HistoricalChart(coin.id,days,currency))
            setHistoricalData(data.prices)
        } catch (error) {
            console.error(error);
        }
    }
console.log(historicalData);
    useEffect(() => {
      fetchChartData()
    }, [currency, days])

   const handleDayClick = (selectedDay)=>{
        setDays(selectedDay);
    }
    
  return (
   <ThemeProvider theme={darkTheme}>
    <Container className={classes.container}>
        {/* chart */}
{!historicalData?(<CircularProgress style={{color:'gold'}} size={250} thickness={1}/>):( 
    <>
    <Line data={{
        labels:historicalData.map((coin)=>{
            let date = new Date(coin[0])
            let time = date.getHours()>12 ?
            `${date.getHours()-12}:${date.getMinutes()} PM` :
            `${date.getHours()}:${date.getMinutes()} AM`

            return days ===1 ? time : date.toLocaleDateString();

        }),
        datasets:[{data:historicalData.map((coin)=>coin[1]),
            label: `Price (Past ${days} Days) in ${currency}`,
            borderColor: '#EEBC1D',
        }]
    }}
    options ={{
        elements:{
            point:{
                radius:1,
            }
        }
    }}
    />
    <div style= {{display:'flex', marginTop:20, justifyContent:'space-around', width:'100%'}}> 
        {chartDays.map(day=>(
            <SelectButtons
            key={day.value} // Essential for proper React behavior
            onClick={() => handleDayClick(day.value)} // Corrected event handler
            selected={day.value === days} // Concise comparison
          >
            {day.label}
          </SelectButtons>
        ))}
    </div>
    </>
)}
        {/* buttons */}

    </Container  >

   </ThemeProvider>
  )
}

export default CoinInfo