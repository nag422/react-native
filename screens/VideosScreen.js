import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react'
import { SafeAreaView, Image, View, FlatList,Animated, StyleSheet, Text, StatusBar,VirtualizedList, RefreshControl, ActivityIndicator, Button } from 'react-native';

import VideoCard from './VideoCard'
import AppbarScreen from './AppbarScreen';

import useVideoSearch from './useVideoSearch';
import YoutubePlayerScreen from './YoutubePlayerScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {Card} from 'react-native-shadow-cards';
import { TextInput } from 'react-native-gesture-handler';

import {Picker} from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const ITEM_SIZE = 500;




const getItem = (data, index) => {
  
  return {
    id: index.toString(),
    title: data[index]['title'],
    URL:data[index]['URL'],
    image:data[index]['image'],
    keytags:data[index]['keytags'],
    channel_title:data[index]['channel_title'],
    channelId:data[index]['channelId'],
    time_elapsed:data[index]['time_elapsed'],
    views:data[index]['views']
  }
}
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const VideosScreen = (props) => {

  const { navigation, route } = props;
  
  
  const [refreshing, setRefreshing] = React.useState(false);

  // Backend State
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [orderby, setOrderby] = useState('newest')
  const [errormsg, setErrormsg] = useState('')
  const [isvideo,setIsvideo] = React.useState(false)
  const [videourl,setVideourl] = React.useState('-QgJgZCJvo4')
  const [visibleform, setVisibleform] = useState(false)
  // const [datavideos,setDatavideos] = useState([])

  // End Backend State
  const sharescreen = (url) => {    
    setVideourl(url)
    setIsvideo(true)
  }
  const togglescreen = () => {
    setIsvideo(false)
  }

  // Backend Article usesearch
  const {
    videos,
    hasMore,
    loading,
    error    
  } = useVideoSearch(query, pageNumber, orderby)
  // End Backend Article usesearch

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     setDatavideos(videos)

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       setDatavideos([])
  //     };
  //   }, [videos])
  // );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPageNumber(1)
    setQuery('')    
    wait(2000).then(() => setRefreshing(false));

  }, [query]);

  const LoadMoreRandomData = () => {
    // console.log('loading more data');
    setPageNumber(prevPageNumber => prevPageNumber + 1)

  }
  const searchcard = React.useCallback(() => {
    setVisibleform(!visibleform)
    
  }, [visibleform]);

  const statechanger = React.useCallback((val) => {
    
    setQuery(val)
    
    
  }, [query]);

  React.useEffect(() => {
    if (route.params?.query) {
      setQuery(route.params?.query)
    }
  }, [route.params?.query]);
  
  const getItemCount = (data) => {
    
    
    return data.length;
  }
  const urlparser = (url) => {
    var parser = new URL(url);
    var newurl = parser.host;
    return newurl;
  }
  

    const renderItem =  ({ item,index}) => { 
     
      
      
        return (<View>

                <View style={{margin:5}} id={index}>                
                <VideoCard dataitem = {item} statechanger={statechanger} navigation={props.navigation} sharescreen={sharescreen} />
                </View>
          
          </View>)
      };

     
     
     
    return (
        <>
        <AppbarScreen navigation={props.navigation} searchcard={searchcard} visibleform={visibleform} title="Videos" subtitle={orderby} />
        {/* <BannerScreen /> */}
        {/* <Image
        style={styles.absoluteFillobject}
        
        source={require('../assets/imgs/backgroundimage.png')}
        
      /> */}
         {visibleform &&
          <Card style={{padding: 10, margin: 10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{marginRight:5}}>Query :</Text>
            <TextInput
                style={{ height: 40, width: 200, borderBottomColor: 'gray', borderBottomWidth:1, borderRadius: 4 }}
                onChangeText={text => setQuery(text)}
                value={query}
            />
            
            </View>
           
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>Order : </Text>
                <Picker
        selectedValue={orderby}
        style={{ height: 50, width: 150,elevation:2 }}
        onValueChange={(itemValue, itemIndex) => setOrderby(itemValue)}
      >
        <Picker.Item label="Newest" value="newest" />
        <Picker.Item label="Oldest" value="oldest" />
      </Picker>
            

 
       

            </View>

            {/* <Text style={{ fontSize: 30 }}>This is a modal!</Text> */}
            {/* <Button onPress={} title="Search" /> */}
        </Card>
}
          
         
         <SafeAreaView style={styles.container}>


        
           
            {/* <FlatList
          // scrollEventThrottle={16}
          showsVerticalScrollIndicator ={false}          
         
            bounces={true}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0}
            onEndReached={LoadMoreRandomData}
            
          /> */}
{isvideo &&
<View style={{marginTop:2,justifyContent:'space-between'}}>
            <>
            <TouchableOpacity>
            <View style={{right:'-88%',width:40}}>
              <Button color="#841584" title="X" onPress={togglescreen} />
              </View>
              </TouchableOpacity>
              <YoutubePlayerScreen videourl={videourl} />
              
             
              
              
          </>
          
    </View>}

  <VirtualizedList
        data={videos}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        horizontal={false}
        onEndReachedThreshold={2}
        onEndReached={LoadMoreRandomData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
           {loading && <ActivityIndicator size="large" color="#0000ff" />}
           {!hasMore && !loading ? <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Sorry, No Results found!</Text></View>:null}
           {error && <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Something is Went Wrong! please try again later!</Text></View>}
           </SafeAreaView>
        
        </>
      );
}

export default VideosScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:5,
      paddingRight:5,
      // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    absoluteFillobject: {
      flex: 1,
      position:'absolute',
      top: 0,
      width:'100%',
      height:'100%',
      
      justifyContent: "center",
      
    },
  });