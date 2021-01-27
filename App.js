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
  // const [access,setAccess] = React.useState(null)


  const initialLoginState = {
    isLoading:true,
    userName: null,
    userToken:null,
    access:null,
    refresh:null,
    articles:[]
  }

  loginReducer = (prevState,action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          access: action.access,
          refresh:action.refresh,
          isLoading:false

        };
      case 'LOGIN':
        AsyncStorage.setItem('access',action.access.toString())
        AsyncStorage.setItem('refresh',action.refresh.toString())
        return {
          ...prevState,
          access: action.access,
          refresh:action.refresh,
          isLoading:false

        };
      case 'REGISTER':
        return {
          ...prevState,
          access: action.access,
          refresh:action.refresh,
          isLoading:false

        };
      case 'LOGOUT':
        AsyncStorage.clear();
        return {
          ...prevState,    
          access:null,     
          isLoading:false

        };
      default:
        return{
          ...prevState,
          isLoading:false
        }
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState)

  React.useEffect(() => {
  //   if (localStorage.getItem('access')) {
  //     const config = {
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `JWT ${localStorage.getItem('access')}`,
  //             'Accept': 'application/json'
  //         }
  //     };

  //     try {
  //         const res = axios.get(`${process_env_REACT_APP_API_URL}/auth/users/me/`, config);

  //         dispatch({
  //             type: USER_LOADED_SUCCESS,
  //             payload: res.data
  //         });
  //     } catch (err) {

  //         dispatch({
  //             type: USER_LOADED_FAIL
  //         });
  //     }
  // } else {
  //     dispatch({
  //         type: USER_LOADED_FAIL
  //     });
  // }

     dispatch({type:'isloadfial'})
    // console.log('useeffect')
    
    
  }, [])


  

  const process_env_REACT_APP_API_URL= "https://app.kiranvoleti.com"
  const authContext = React.useMemo(
    () => ({
      login:  async (email,password) => {
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      };
  
      const body = JSON.stringify({ email, password });
  
      try { 
          const res = await axiosInstance.post(`${process_env_REACT_APP_API_URL}/auth/jwt/create/`, body);
              
              console.log(res.data.access)
              console.log(res.data.refresh)
          
            // axiosInstance.defaults.headers['Authorization'] = 'JWT ' + AsyncStorage.getItem("access")
            dispatch({type:'LOGIN',access:res.data.access,refresh:res.data.refresh})
          
            // saving error
            // await AsyncStorage.clear()
           
            

          
          
      } catch (err) {
        // await AsyncStorage.clear()
        console.log('console.error();')
        console.log(e.message)
        Promise.reject(e)
      }
      
      console.log('login')
      },
      logout: async () => {
        
        dispatch({type:'LOGOUT'})
        setIsLoading(false)
        console.log('logout')

        // await AsyncStorage.clear()
      },
      register:  () => {
        setAccess('fgk');
        setIsLoading(false)
        console.log('register')
      },
      getarticles:  () => {
        setAccess('fgk');
        setIsLoading(false)
        console.log('register')
      },
    }),
    [],
  );

  if(loginState.isLoading){
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
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <Providers isaccesstokenset = {loginState.access} />
      </PaperProvider>
    </AuthContext.Provider>
  )
}

export default App
