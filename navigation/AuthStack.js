import React, {useState} from "react";
import { Image, View, Text } from "react-native";
// import { AppLoading } from "expo";
import AppLoading from 'expo-app-loading'
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";

import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";


import AsyncStorage from '@react-native-community/async-storage';

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

// import Screens from "./navigation/Screens";
import Login from "../screens/Login";
import Onboardingscreen from "../screens/Onboarding";
import Register from "../screens/Register";



const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



// cache app images

const assetImages = [
  
];
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

// cache product images
// articles.map(article => assetImages.push(article.image));



export default AuthStack = () => {
  const [isLoadingComplete, setLoading] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  let [fontsLoaded] = useFonts({
    'ArgonExtra': require('../assets/font/argon.ttf'),
  });

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null) 
    
  
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  function _loadResourcesAsync() {
    console.log('images loaded')
    // return Promise.all([...cacheImages(assetImages)]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

 function _handleFinishLoading() {
    setLoading(true);
  };

  if(!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else if(fontsLoaded) {
    return (
      <>
      
        <Stack.Navigator>
        <Stack.Screen
          name="Onboardingscreen"
          component={Onboardingscreen}
          option={{
            headerTransparent: true
          }}
        />
        

        <Stack.Screen
          name="Login"
          component={Login}
          option={{
            headerTransparent: true
          }}
        />

      <Stack.Screen
          name="Register"
          component={Register}
          option={{
            headerTransparent: true
          }}
        />
        </Stack.Navigator>
       
           
         
     
      
      
        
      </>
    );
  } else {
    return null
  }
}


