import React from 'react'
import Providers from './navigation/Index';
import { DefaultTheme } from '@react-navigation/native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';

import moment from 'moment'
import { AuthContext } from './contexts/AuthContext';

import axiosInstance from './axiosmodelapi'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';


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

  const [isFirstLaunch,setIsFirstLaunch] = React.useState(false)
  const [isuserSignedin, setIsuserSignedin] = React.useState(false);
  const [loginerror, setLoginerror] = React.useState(false);
  const [signupsuccess, setSignupsuccess] = React.useState(false)
  const [signuperror, setSignuperror] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false);
  const [signing, setSigning] = React.useState(false)
  const [userdata, setUserdata] = React.useState({

    first_name: "",
    last_name: "",
    email: "",
    joined: "",
    usertype: "",
    phone: "",
    id: '',
    tier: ''

  })

  const retrieveData = async () => {
    try {
      setIsLoading(true)
      const creds = await AsyncStorage.getItem('logindetails');

      if (creds !== null && creds !== undefined) {
        const detail = JSON.parse(creds)
        // setIsFirstLaunch(true)          
        await login(detail.uname, detail.pwd)
        setIsLoading(false)
        
      }else{
        
        setIsLoading(false)
      }
      

    } catch (err) {
      
      setIsLoading(false)

    }
  }

  React.useEffect(() => {   
    
    retrieveData();    
    
    return () => {
      setIsLoading(false)
    }

  }, [])


  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const process_env_REACT_APP_API_URL = "https://app.kiranvoleti.com"


  const load_user = async () => {


    await axiosInstance.get(`${process_env_REACT_APP_API_URL}/testing/checkfun/`)
      .then(res => {

        // setProfilename(res.data.response.first_name)


        (res.data.response.map((val) => {
          setUserdata({
            ...userdata,
            first_name: val.first_name,
            last_name: val.last_name,
            email: val.email,
            id: val.id,
            tier: val.tier,
            phone: val.phone,
            joined: `${moment(val.joined, 'YYYY-MM-DD h:mm:ss').fromNow()}`,
            usertype: val.is_staff ? (val.is_superuser ? 'Admin' : 'Staff') : 'Subscriber'

          })

          if (!val.is_active || val.trends) {
            setIsuserSignedin(false)
            
            setLoginerror(true)
          } else {
            setIsuserSignedin(true)
            
          }




        }

        ))


      })

  };


  const login = async (email, password) => {

    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }


    try {
      setSigning(true)
      const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/jwt/create/`, body,config);


      storeToken(JSON.stringify({ access: res.data.access, refresh: res.data.refresh, uname: email, pwd: password }))

      setSigning(false)

    } catch (err) {

      setSigning(false)
      setLoginerror(true)

    }

  }

  const signup = async (first_name, email, password, re_password) => {
    // if(first_name == null || email == null) return
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let issignupval = false
    const provider = 'rest'
    const body = JSON.stringify({ first_name, email, provider, password, re_password });


    
      await axios.post(`${process_env_REACT_APP_API_URL}/auth/users/`, body, config)
        .then((res) => {

          console.log(res.data)
          setSignupsuccess(true)
          setSignuperror(false)
          issignupval = true


        }).catch(err => {
          console.log(err.message)
          setSignupsuccess(false)
          setSignuperror(true)
          
        })

        return issignupval



    
  };

  const storeToken = async (body) => {

    try {
      await AsyncStorage.setItem('logindetails', body);
      const parseditem = JSON.parse(body);

      axiosInstance.defaults.headers['Authorization'] = 'JWT ' + parseditem.access;
      
      setLoginerror(false)
      await load_user();


    } catch (e) {
      setLoginerror(true)
      
    }



  }



  const logout = async () => {
    

    // console.log('logout')

    await AsyncStorage.clear()
    setIsuserSignedin(false)
    setIsLoading(false)
  }



  
  

    return (

      <AuthContext.Provider value={{ loginerror, signuperror, signupsuccess, userdata,isuserSignedin,isLoading,signing, logout, login, signup, load_user }}>
  
        <PaperProvider theme={theme}>
  
          <Providers />
  
        </PaperProvider>
  
      </AuthContext.Provider>
  
  
    )


  
  
  
}

export default App
