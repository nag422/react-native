import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import AppbarScreen from './AppbarScreen'
// import { WebView } from 'react-native-webview';
const ToolsScreen = (props) => {
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await AsyncStorage.getItem('access');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
        //   dispatch({ type: 'RESTORE_TOKEN', token: userToken });
         console.log('async',userToken)
        };
    
        bootstrapAsync();
      }, []);
    
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Tools" subtitle="Newest"/>
       
            {/* <WebView style={styles.container} source={{ uri: 'https://app.kiranvoleti.com/' }} onError={(e)=> alert(e.nativeEvent.description)}/> */}

        
        </>
    )
}

export default ToolsScreen

// const styles = StyleSheet.create({
//     container:{
//         flex:1
//     }
// })
