import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

function CryptoContext({children}) {
    const [currency, setCurrency] = useState('NGN')
    const [symbol, setSymbol] = useState('#')

    useEffect(() => {
      if (currency==='NGN') {
        setSymbol('NGN')
      }
      else if(currency==='USD'){
        setSymbol('$')

      }
    
    }, [currency])
    

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>{children}</Crypto.Provider>
  )
}

export default CryptoContext;


export const CryptoState = ()=> {
  return useContext(Crypto)
  
}

