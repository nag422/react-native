import React from 'react'
import Providers from './navigation/Index';
import {DefaultTheme} from '@react-navigation/native';
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
  
  
  const [isuserSignedin,setIsuserSignedin] = React.useState(false);
  const [loginerror,setLoginerror] = React.useState(false);
  const [signupsuccess,setSignupsuccess] = React.useState(false)
  const [signuperror,setSignuperror] = React.useState(false)
  const [isLoading,setIsLoading] = React.useState(false);
  const [userdata,setUserdata] = React.useState({
    
    first_name:"",
    last_name:"",
    email:"",
    joined:"",
    usertype:"",
    phone:"",
    id:'',
    tier:''

  })
  
  

  React.useEffect(() => {

    const retrieveData = async() =>{
    try{
    const creds = await AsyncStorage.getItem('logindetails');
    
    if (creds !== null && creds !== undefined){
      const detail = JSON.parse(creds) 
      login(detail.uname,detail.pwd)
    }
    setIsLoading(false)
    
  }catch(err){    
    setIsLoading(false)    
    
  }
    }
  retrieveData()
    
  }, [])


  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const process_env_REACT_APP_API_URL= "https://app.kiranvoleti.com"


  const load_user = async() => {
    

    await axiosInstance.get(`${process_env_REACT_APP_API_URL}/testing/checkfun/`)
    .then(res => {
      
      // setProfilename(res.data.response.first_name)
      
      
     (res.data.response.map((val) => {
        setUserdata({
          ...userdata,
            first_name:val.first_name,
            last_name: val.last_name,
            email: val.email,
            id:val.id,
            tier:val.tier,
            phone:val.phone,   
            joined:`${moment(val.joined,'YYYY-MM-DD h:mm:ss').fromNow()}`,
            usertype: val.is_staff ? (val.is_superuser ? 'Admin': 'Staff') : 'Subscriber'

        })
        
        
      } 
        
        ))

 
    })
    
};


  const login = async(email,password) => {

    const body = JSON.stringify({ email, password });
    
  
      try { 
          const res = await axiosInstance.post(`${process_env_REACT_APP_API_URL}/auth/jwt/create/`, body);         
              
             
          storeToken(JSON.stringify({access:res.data.access,refresh:res.data.refresh,uname:email,pwd:password}))
          
          
          
      } catch (err) {
        
       setIsLoading(false)   
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
    const provider='rest'
    const body = JSON.stringify({ first_name, email,provider,password, re_password }); 
   

    try {
        await axios.post(`${process_env_REACT_APP_API_URL}/auth/users/`, body, config)
        .then((res)=> {

           
          setSignupsuccess(true)
          setSignuperror(false)
          

        }).catch(err=> {
          
          setSignupsuccess(false)
          setSignuperror(true)
          wait(6000).then(() => setSignuperror(false));
        })
        
        
       
    } catch (err) {
      // console.log('error status',err.message)
      setIsLoading(false) 
      setSignuperror(true)
      
       
    }
};

  const storeToken = async (body) => {  
    
    try{
      await AsyncStorage.setItem('logindetails',body);
      const parseditem = JSON.parse(body);
      axiosInstance.defaults.headers['Authorization'] = 'JWT ' + parseditem.access;
      setIsLoading(false);
      setLoginerror(false)
      await load_user();
      await setIsuserSignedin(true)

    }catch(e){
      setLoginerror(true)
      setIsLoading(false);
    }
   

    
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
    <AuthContext.Provider value={{isLoading,loginerror,signuperror,signupsuccess,userdata,logout,login,signup,load_user}}>
       
        <PaperProvider theme={theme}>
          <Providers isaccesstokenset = {isuserSignedin} />
        </PaperProvider>
     
    </AuthContext.Provider>
    
  )
}

export default App
