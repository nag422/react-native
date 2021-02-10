import * as React from 'react';
import { View,FlatList,Text,StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph,Chip,IconButton, Colors } from 'react-native-paper';
import moment from 'moment';
// import KeyTagScreen from './KeyTagScreen'
// const LeftContent = props => <Avatar.Icon {...props} icon="earth" size={35} style={{color:'gray',backgroundColor:'white'}} />
import { Linking } from 'react-native';
import LinkUrlScreen from './LinkUrlScreen'


const addDefaultSrc = (ev) => {
  ev.target.src = 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg'
}


const ToolCard = ({dataitem,dataurl,statechanger,navigation}) =>{ 


  
  


  return (
  
    
  <Card>
    
    
    <Card.Cover onTouchEnd={() => navigation.navigate('webview',{url:`https://app.kiranvoleti.com/view_website/${dataitem.id}/${dataitem.category.toLowerCase()}`,screenurl:dataitem.URL})} source={{ uri: dataitem.image?dataitem.image:'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg' }} />
    
    
    {/* <Card.Title style={{fontSize:15,fontFamily:'Raleway-Regular'}} title={dataurl} left={LeftContent} /> */}
    <View style={{flex:1}}>
    
    <View onTouchEnd={()=>navigation.navigate('webview',{url:dataitem.URL})} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',top:8}}>
      <View style={{marginLeft:6,top:2}}>
        <Avatar.Icon icon="earth" size={30} style={{color:'gray',backgroundColor:'white'}} />           
      </View>
      <View>
        <Text style={{fontSize:15,fontFamily:'Raleway-Regular',color:'gray'}}>{dataurl}</Text>
      </View>
    </View>
    {/* </LinkUrlScreen> */}
    <Card.Content>
      <View style={{flex:1,top:16}}>
      
      
      <Paragraph onTouchEnd={() => navigation.navigate('webview',{url:`https://app.kiranvoleti.com/view_website/${dataitem.id}/${dataitem.category.toLowerCase()}`,screenurl:dataitem.URL})} style={{fontSize:20,fontFamily:'Raleway-SemiBold',lineHeight:25}}>{dataitem.title.toString()}</Paragraph>
      
        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginTop:10}}>
              <View>
                      <IconButton
                  icon="tag-outline"
                  color='gray'
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
            </View>

            
                {(dataitem.keytags).map((val,index)=> <Chip style={styles.tags} onPress={() => statechanger(val)} key={index}>{val}</Chip>)}
            
      </View>
      </View>
    </Card.Content>
    
    <Card.Actions>
      <View style={styles.datestyle}>
        <View style={{top:2}}>
      <IconButton
    icon="alarm"
    color='gray'
    size={18}
    onPress={() => console.log('Pressed')}
  />
       </View>
       <View>
      <Text style={{fontSize:15,fontFamily:'Raleway-Regular',color:'gray'}}> {moment(dataitem.time_elapsed,'YYYY-MM-DD h:mm:ss').fromNow()} </Text>
      </View>
  </View>    
    </Card.Actions>
    </View>
  </Card>
  
)};

export default ToolCard;


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
    flex:1,
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
  
  loginform: {
    shadowOffset:{
      width:0,
      height:-2
    },
    shadowOpacity:0.1,
    shadowRadius:2,
    elevation:2
  }
});