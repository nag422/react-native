import React from 'react'
import Providers from './navigation/Index';
import { Provider as PaperProvider } from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider>
      <Providers />
    </PaperProvider>
  )
}

export default App
