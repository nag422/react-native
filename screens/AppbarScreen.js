import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import {useRoute,useNavigation,DrawerActions} from '@react-navigation/native';

const AppbarScreen = ({navigation,...rest}) => {
  const _goBack = () => navigation.goBack();

  const _handleSearch = () => console.log('Searching');

  const route = useRoute();
  const profilenavigation = useNavigation();
  
  
  
  const _handleMore = () => {
      
        
        profilenavigation.navigate('Videos');
        console.log('its wrong')
      
    };
    const _handleMore1 = () => {
          try{
            navigation.toggleDrawer()
          }catch(e){
            profilenavigation.navigate('Articles')            
            console.log(route.name)
          }
          
          
        
        
      };

  return (
    <>
    <Appbar.Header style={styles.header}>
      <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:'6%',color:'white'}}>
        {profilenavigation.canGoBack()  &&
      <Appbar.BackAction color="white" onPress={_goBack} />}
      <Appbar.Content {...rest} />
      <Appbar.Action color="white" icon="magnify" onPress={_handleSearch} />
      {route.name !== "Home"  &&
      <Appbar.Action color="white" icon="view-headline" onPress={_handleMore1} />}
      
      {/* <Appbar.Action icon="cog-outline" onPress={_handleMore} /> */}
      </View>
    </Appbar.Header>
    
    </>
  );
};

export default AppbarScreen;

const styles = StyleSheet.create({
    header: {
      position: 'relative',
      left: 0,
      right: 0,
      top: 0,
      height:30
    },
  });