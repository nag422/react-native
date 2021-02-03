import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import AppbarScreen from './AppbarScreen'

const  WebviewScreen =(props) => {
  const {navigation,route} = props
  const [url,setUrl] = React.useState('https://kiranvoleti.com')
  React.useEffect(() => {
    if (route.params?.url) {
      setUrl(route.params?.url)
    }
  }, [route.params?.url]);

  return (
    <>
    <AppbarScreen navigation={navigation} title={url} />
    <WebView startInLoadingState={true} renderLoading ={()=><View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>loading Wait...</Text></View>} originWhitelist={['*']} source={{ uri: url }} />
    </>
  )
}
export default WebviewScreen