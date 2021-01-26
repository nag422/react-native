import * as React from 'react';
import { View,FlatList,Text,StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph,Chip,IconButton, Colors } from 'react-native-paper';
import moment from 'moment';
import KeyTagScreen from './KeyTagScreen'
const LeftContent = props => <Avatar.Icon {...props} icon="earth" size={35} style={{color:'gray',backgroundColor:'white'}} />



const addDefaultSrc = (ev) => {
  ev.target.src = 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg'
}


const ArticleCard = ({dataitem,dataurl}) =>{ 


  
  


  return (
  
    
  <Card>
    <Card.Cover source={{ uri: dataitem.image?dataitem.image:'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg' }} />
    <Card.Title title={dataurl} left={LeftContent} />
    <Card.Content>
      <Paragraph>{dataitem.title}</Paragraph>
      {/* <Paragraph>{dataitem.time_elapsed}</Paragraph> */}
        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
        <IconButton
    icon="tag-outline"
    color={Colors.gray100}
    size={30}
    onPress={() => console.log('Pressed')}
  />
     {(dataitem.keytags).map((val,index)=> <Chip style={styles.tags} key={index}>{val}</Chip>)}
      </View>

    </Card.Content>
    
    <Card.Actions>
      <View style={styles.datestyle}>
      <IconButton
    icon="alarm"
    color={Colors.gray100}
    size={15}
    onPress={() => console.log('Pressed')}
  />
       
      <Text> {moment(dataitem.time_elapsed,'YYYY-MM-DD h:mm:ss').fromNow()} </Text>
     
  </View>    
    </Card.Actions>
  </Card>
  
)};

export default ArticleCard;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    // marginTop: StatusBar.currentHeight || 0,
  },
  tags: {
    backgroundColor: '#fff',
    borderColor:'gray',
    color:'#fff',
    padding: 2,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  datestyle: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
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