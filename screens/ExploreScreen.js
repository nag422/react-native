import React from 'react'
import { View, Text, StyleSheet,Dimensions,Image } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AppbarScreen from './AppbarScreen'
import ChipScreen from './ChipScreen'
// import ModalScreen from './ModalScreen'
import BottomrawScreen from './BottomrawScreen'
import InputScreen from './InputScreen'
const { width, height } = Dimensions.get("window");



const ExploreScreen = (props) => {

    const [newChips,setNewChips] = React.useState([
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Articles',
        image:'https://static.vecteezy.com/system/resources/thumbnails/000/505/114/small/Education_31-60_144.jpg'
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Videos',
        image:'https://cdn.iconscout.com/icon/free/png-256/videos-17-461736.png'
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Tools',
        image:'https://www.freeiconspng.com/uploads/tool-tools-working-workshop-wrench-icon--18.png'
      }
    ])
   
    const renderItem = ({ item }) => (
        <TouchableOpacity
            
            onPress={()=>console.log('category pressed')}
            >
        
        <View style={styles.item}>
            

            
            <Image
            resizeMode="cover"
            source={{uri:item.image }}
            style={{
                width:width * 0.23,
                height: "82%",
                borderRadius:15

            }}
            >

            </Image>
            
            <View style={{position:'absolute',right:8,bottom:2,paddingTop:30}}>
          <Text style={styles.title}>{item.title}</Text>
          </View>
          
        </View>
        </TouchableOpacity>
      );
    

    return (<>
       
        <View style={styles.container}>
            <AppbarScreen navigation={props.navigation} title="Explore" />
                <View style={styles.upper}>
                    <View style={styles.innerupper}>
                        <View style={styles.brandtextcontainer}>
                            <View style={styles.brandtext}>
                            <Text style={{color:'white'}}>Choose Category</Text>
                            <TouchableOpacity onPress={()=>console.log('fullscreenpressed')}>
                                <Text style={{color:'white'}}>O</Text>
                            </TouchableOpacity>

                            </View>
                            <View style={{marginTop:8}}>
                                <FlatList 
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data = {newChips}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>
                            
                        </View>

                    </View>

                </View>
            {/* <ScrollView>
                <View style={styles.categoryform}>
                    <InputScreen />
                </View>
                <View style={styles.container}>

                    {new Array(40).fill().map((e, i) =>

                        <ChipScreen key={i} style={styles.text} mode="outlined" />
                    )}
                </View>

            </ScrollView> */}

                <View style={{height:"50%", backgroundColor:'white'}}>
                    <View style={{
                        flex: 1,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: 'white'
                    }}>
                        <View style={{marginTop:10,marginHorizontal:24}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Text style={{color:'gray',fontSize:15}}>Today's Searches</Text>
                                <TouchableOpacity
                                onPress={() => {console.log('see all pressed')}}
                                >
                                    <Text style={{color:'gray',fontSize:15}}>See All {'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',height:'100%',marginTop:24}}>
                            
                            <View style={{flex:1,backgroundColor:'white',margin:1}}>


                                <ScrollView>
                
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flexWrap:'wrap',marginBottom:3}}>

                    {new Array(40).fill().map((e, i) =>

                        <ChipScreen key={i} style={{padding:3,marginTop:3,marginHorizontal:1}} mode="outlined" />
                    )}
                </View>

            </ScrollView>
                            </View>
                        </View>

                    </View>                    
                </View>
                
                {/* <BottomMaterialbar /> */}
        </View>
        
       
        {/* <BottomrawScreen />  */}
        {/* <ModalScreen /> */}

    </>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height:'100%'
        
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        // flexWrap: 'wrap',
        // shadowColor: "black",
        // elevation: 5,

    },
    upper:{
        height:"30%",
        backgroundColor:"#fff"

    },
    innerupper:{
        flex:1,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        backgroundColor:'#333396'
    },
    brandtextcontainer:{
        marginTop:12 * 2,
        marginHorizontal: 12 * 2

    },
    brandtext: {
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
    },
    text: {
        margin: 1
    },
    categoryform: {
        display: 'flex',
        padding: 3,
        margin: 5

    },
    item: {
        position:'relative',
        backgroundColor: '#fff',
        padding: 27,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
      },
      title: {
        fontSize: 12,
        alignItems:'center',
        color:'white',
        left:5,
        right:'8%',
        backgroundColor:'#4677df',
        borderRadius:4,
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:10,
        paddingRight:10
      },
});
