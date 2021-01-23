import React from 'react'
import { SafeAreaView, Image, View, FlatList,Animated, StyleSheet, Text, StatusBar,VirtualizedList, RefreshControl } from 'react-native';


import AppbarScreen from './AppbarScreen';
import ArticleCard from './ArticleCard';
import BannerScreen from './BannerScreen';

const DATAS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28',
    title: 'First Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fb1aa97f63',
    title: 'Second Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '58694a0f-3da1-471f-bd965571e29d72',
    title: 'Third Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: 'bd7acbea-c1b1-46c2-d5-3ad53abb28ba',
    title: 'First Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '3ac68afc-c605-48d34f8-fbd91aa97f63',
    title: 'Second Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '58694a0f-3da1-471f-b6-145571e29d72',
    title: 'Third Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: 'bd7acbea-c1b1-c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '3ac68afc-605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '58694a0f-3da1-41f-bd96-145571e29d72',
    title: 'Third Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: 'bd7cbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '3ac68ac-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
  },
  {
    id: '58694a0f-3d-471f-bd96-145571e29d72',
    title: 'Third Item',
    description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
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
    id: data[index]['id'],
    title: data[index]['title'],
    description:data[index]['description']
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([])

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const LoadMoreRandomData = () => {
    console.log('loading more data');
    const dataresp = [
      {
        id: Math.random().toString(12),
        title: 'succcess load1',
        description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
      },
      {
        id: Math.random().toString(12),
        title: 'success load2',
        description:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
      }
    ]

    setData(prevData => {
      return [...new Set([...prevData, ...dataresp])]
  })
  }
  
  const getItemCount = (data) => {
    
    
    return data.length;
  }

  

    const renderItem = ({ item,index}) => { 
      
      
        return (<View>

                <View style={{margin:5}} id={index}>
                <ArticleCard item = {item} />
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
        data={data}
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