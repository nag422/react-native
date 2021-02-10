import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import {useRoute,useNavigation,DrawerActions} from '@react-navigation/native';

const AppbarScreen = ({navigation,searchcard,visibleform,...rest}) => {
  // const _goBack = () => navigation.goBack();

  

  const _handleSearch = () => console.log('Searching');

  const route = useRoute();
  const profilenavigation = useNavigation();
  const _goBack = () => {
    try{
      if(navigation.canGoBack()){
        navigation.goBack()
      }else{
        navigation.navigate('Articles')
        // console.log(navigation.canGoBack())
      }
      
    }catch(e){
      navigation.navigate('Articles')
    }
  
    
  };
  
  
  
  const _handleMore = () => {
      
        
        profilenavigation.navigate('Videos');
        
      
    };
    const _handleMore1 = () => {
          
            profilenavigation.navigate('Articles')            
            
          
          
          
        
        
      };

  return (
    <>
    <Appbar.Header style={styles.header}>
      <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:'6%',color:'white'}}>
        
        {navigation.canGoBack() ?
      <Appbar.BackAction color="white" onPress={_goBack} />: null}
      {profilenavigation.canGoBack() ? 
      <Appbar.Content {...rest} onPress={_goBack} />: <Appbar.Content {...rest} />
      }
      

      {searchcard &&
      <Appbar.Action color="white" icon={visibleform?'close':'magnify'} onPress={()=>searchcard()} />}
      
      {/* <Appbar.Action color="white" icon="view-headline" onPress={_handleMore1} /> */}
      {route.name !== "Home"  &&
      <Appbar.Action icon="cog-outline" onPress={_handleMore1} />}
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