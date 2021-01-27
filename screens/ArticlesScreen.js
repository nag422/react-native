import AsyncStorage from '@react-native-community/async-storage';
import React,{useState,useEffect} from 'react'
import { SafeAreaView, Image, View, FlatList,Animated, StyleSheet, Text, StatusBar,VirtualizedList, RefreshControl } from 'react-native';


import AppbarScreen from './AppbarScreen';
import ArticleCard from './ArticleCard';
import BannerScreen from './BannerScreen';
import useArticleSearch from './useArticleSearch';


const DATAS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'business.twitter.com',
    title: 'How video is reshaping digital advertising How video is reshaping digital advertising How video is reshaping digital advertising How video is reshaping digital advertising How video is reshaping digital advertising How video is reshaping digital advertisingHow video is reshaping digital advertising',
    image:'',
    keytags:['Digital','Marketing']
    
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'business.twitter.com',
    title: 'business.twitter.com',
    image:'',
    keytags:['Digital','Marketing']
    
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'business.twitter.com',
    title: 'business.twitter.com',
    image:'',
    keytags:['Digital','Marketing']
    
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'business.twitter.com',
    title: 'business.twitter.com',
    image:'',
    keytags:['Digital','Marketing']
    
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'https://picsum.photos/300',
    title: 'business.twitter.com',
    image:'https://picsum.photos/300',
    keytags:['Digital','Marketing']
    
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'https://picsum.photos/300',
    title: 'business.twitter.com',
    image:'https://picsum.photos/300',
    keytags:['Digital','Marketing']
    
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    URL:'https://picsum.photos/300',
    title: 'business.twitter.com',
    image:'https://picsum.photos/300',
    keytags:['Digital','Marketing']
    
  }
  
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const ITEM_SIZE = 500;




const getItem = (data, index) => {
  
  return {
    id: index.toString(),
    title: data[index]['title'],
    URL:data[index]['URL'],
    image:data[index]['image'],
    keytags:data[index]['keytags'],
    time_elapsed:data[index]['time_elapsed']
  }
}
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const ArticlesScreen = (props) => {

  
  
  const [data,setData] = React.useState(DATAS)
  const [refreshing, setRefreshing] = React.useState(false);

  // Backend State
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [orderby, setOrderby] = useState('newest')
  const [errormsg, setErrormsg] = useState('')
  // End Backend State


  // Backend Article usesearch
  const {
    articles,
    hasMore,
    loading,
    error    
  } = useArticleSearch(query, pageNumber, orderby)
  // End Backend Article usesearch

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([])

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const LoadMoreRandomData = () => {
    console.log('loading more data');
    setPageNumber(prevPageNumber => prevPageNumber + 1)

  }
  
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
                <ArticleCard dataitem = {item} dataurl={((item.URL).split('//')[1]).split('/')[0]} />
                </View>
          
          </View>)
      };

     
     
     
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Articles" subtitle="Newest" />
        {/* <BannerScreen /> */}
        {/* <Image
        style={styles.absoluteFillobject}
        
        source={require('../assets/imgs/backgroundimage.png')}
        
      /> */}
        
          
         
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

  <VirtualizedList
        data={articles}
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
           
           </SafeAreaView>
        
        </>
      );
}

export default ArticlesScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10,
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