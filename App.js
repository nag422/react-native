import React from 'react'
import Providers from './navigation/Index';
import {DefaultTheme} from '@react-navigation/native';
import {  
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';

import { AuthContext } from './contexts/AuthContext';



const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    background: 'white',
    primary: '#333396',
    text: 'black',
  },
};

const App = () => {

  
  const auth = React.useMemo(
    () => ({
      login:  async (email,password) => {
        console.log(email,password)
      },
      logout: () => {
        console.log('logout')
      },
      register:  () => {
        console.log('register')
      },
    }),
    [],
  );


  return (
    <AuthContext.Provider value={auth}>
      <PaperProvider theme={theme}>
        <Providers/>
      </PaperProvider>
    </AuthContext.Provider>
  )
}

export default App
