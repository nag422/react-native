import * as React from 'react';
import { View,FlatList,Text,StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph,Chip,IconButton, Colors } from 'react-native-paper';
import KeyTagScreen from './KeyTagScreen'
const LeftContent = props => <Avatar.Icon {...props} icon="earth" />




const ArticleCard = ({dataitem}) =>{ 

  


  return (
  
    
  <Card>
    <Card.Cover source={{ uri: 'https://picsum.photos/300' }} />
    <Card.Title title={dataitem.URL} left={LeftContent} />
    <Card.Content>
      <Paragraph>{dataitem.title}</Paragraph>
      <Paragraph>{dataitem.time_elapsed}</Paragraph>
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
      <Text>{new Date().toDateString()}</Text>  
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