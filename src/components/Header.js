import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'


const useStyles = makeStyles({
    title:{
        flex:1,
        color:'gold',
        fontFamily:'montserrat',
        fontWeight:'bold',
        cursor:'pointer'
    }
})

const darkTheme = createTheme({
    palette: {
      primary: {
        main:'#fff',
    },
    type: 'dark',

}
  });

function Header() {
const {currency, setCurrency} = CryptoState()

const navigator = useNavigate()
    const classes = useStyles()

  const handleCurrencyChage = (e)=>{
    setCurrency(e.target.value)
    console.log('currency changed to '+e);
}

  return (
   
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography  onClick={()=>navigator('/')} className={classes.title}>Crypto Hunter</Typography>
                    <Select variant='outlined' style={{width:100, height:40, marginLeft:15}} value={currency} onChange={handleCurrencyChage}>
                        <MenuItem value='USD'>USD</MenuItem>
                        <MenuItem value='NGN'>NGN</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
  
  )
}

export default Header