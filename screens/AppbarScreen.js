import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import {useRoute,useNavigation,DrawerActions  } from '@react-navigation/native';

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
       
          navigation.toggleDrawer()
          console.log(route.name)
        
        
      };

  return (
    <>
    <Appbar.Header style={styles.header}>
        {route.name != "Articles" &&
      <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content {...rest} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      {route.name != "Articles" && route.name != "Videos" && route.name != "Tools"  ?
      <Appbar.Action icon="cog-outline" onPress={_handleMore} />:<Appbar.Action icon="view-headline" onPress={_handleMore1} />}
    </Appbar.Header>
    
    </>
  );
};

export default AppbarScreen;

const styles = StyleSheet.create({
    header: {
      backgroundColor:'#fff'
    },
  });