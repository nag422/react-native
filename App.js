import React from 'react'
import Providers from './navigation/Index';
import {DefaultTheme} from '@react-navigation/native';
import {  
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';



import { AuthContext } from './contexts/AuthContext';

import axiosInstance from './axiosmodelapi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';
import useArticleSearch from './screens/useArticleSearch';
const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
  }
};

const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    background: 'white',
    primary: '#333396',
    text: 'black'    
  }
  
};



const App = () => {
  const [isLoading,setIsLoading] = React.useState(true);
  const [pageNumber,setPageNumber] = React.useState(null);
  const [isuserSignedin,setIsuserSignedin] = React.useState(false);
  
  

  React.useEffect(() => {

    const retrieveData = async() =>{
    try{
    const creds = await AsyncStorage.getItem('logindetails');
    
    if (creds !== null && creds !== undefined){
      const detail = JSON.parse(creds) 
      login(detail.uname,detail.pwd)
    }
    
  }catch(err){    
    setIsLoading(false)    
    console.log(err.message)
    console.log('sync fails')
  }
    }
  retrieveData()
    
  }, [])


  

  const process_env_REACT_APP_API_URL= "https://app.kiranvoleti.com"


  


  const login = async(email,password) => {

    const body = JSON.stringify({ email, password });
  
      try { 
          const res = await axiosInstance.post(`${process_env_REACT_APP_API_URL}/auth/jwt/create/`, body);         
              
             
          storeToken(JSON.stringify({access:res.data.access,refresh:res.data.refresh,uname:email,pwd:password}))
          
          
          
      } catch (err) {
        console.log(err.message)
       console.log('login failed')
       setIsLoading(false)    
       
      }

  }

  const signup = async (first_name, email, password, re_password) => {
    if(first_name == null && email == null) return
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const provider='rest'
    const body = JSON.stringify({ first_name, email,provider,password, re_password }); 
   

    try {
        const res = await axiosInstance.post(`${process_env_REACT_APP_API_URL}/auth/users/`, body, config);
        setIsLoading(false)  
       
    } catch (err) {
      setIsLoading(false) 
       
    }
};

  const storeToken = async (body) => {  
    
    
    await AsyncStorage.setItem('logindetails',body);
    const parseditem = JSON.parse(body);
    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + parseditem.access;
    await setIsuserSignedin(true)
  }
   
  

  const logout= async () => {
    setIsLoading(false)
       
    // console.log('logout')

    await AsyncStorage.clear()
    setIsuserSignedin(false)
  }

 

  if(isLoading){
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>
        <ActivityIndicator size="large" color="#417e92" />
        </Text>
         <Text>Loading..Wait</Text>
      </View>
    )
  }
  return (
    <AuthContext.Provider value={{logout,login,signup}}>
       
        <PaperProvider theme={theme}>
          <Providers isaccesstokenset = {isuserSignedin} />
        </PaperProvider>
     
    </AuthContext.Provider>
    
  )
}

export default App
