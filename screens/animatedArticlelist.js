import React from 'react'
import { SafeAreaView, Image, View, FlatList,Animated, StyleSheet, Text, StatusBar,VirtualizedList } from 'react-native';


import AppbarScreen from './AppbarScreen';
import ArticleCard from './ArticleCard';
import BannerScreen from './BannerScreen';

const DATA = [
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
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const ITEM_SIZE = 500;

const LoadMoreRandomData = () => {
  console.log('loading more data');
}
const ArticlesScreen = (props) => {

    const renderItem = ({ item,index}) => { 
      const inputRange = [-1,0, ITEM_SIZE * index, 
        ITEM_SIZE * (index * 2)];
        const outputval = [1,1,1,1]
        const scale = scrollY.interpolate({
          inputRange,
          outputRange:outputval,
          
        })
      
        return (<Animated.View style={{transform:[{scale}]}}>

                <View style={{margin:5}}>
                <ArticleCard item = {item} />
                </View>
          
          </Animated.View>)
      };

      const scrollY = React.useRef(new Animated.Value(0)).current;
      
     
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Articles" subtitle="Newest" />
        {/* <BannerScreen /> */}
        {/* <Image
        style={styles.absoluteFillobject}
        
        source={require('../assets/imgs/backgroundimage.png')}
        
      /> */}
        
          
         
         <SafeAreaView style={styles.container}>
           
            <Animated.FlatList
          // scrollEventThrottle={16}
          showsVerticalScrollIndicator ={false}          
          onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{y:scrollY}}}],
            {useNativeDriver:true}
          )}
            bounces={true}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0}
            onEndReached={LoadMoreRandomData}
            
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