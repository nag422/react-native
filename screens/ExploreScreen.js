import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AppbarScreen from './AppbarScreen'
import ChipScreen from './ChipScreen'
// import ModalScreen from './ModalScreen'
import BottomrawScreen from './BottomrawScreen'
import InputScreen from './InputScreen'
const ExploreScreen = (props) => {
    return (<>
        <AppbarScreen navigation={props.navigation} title="Explore" />        
        <ScrollView>
        <View style={styles.categoryform}>
                <InputScreen />
         </View>
        <View  style={styles.container}> 

        {new Array(40).fill().map((e,i) =>
                   
            <ChipScreen key={i} style={styles.text} mode="outlined" />
         )}
         </View>
         
        </ScrollView>
        {/* <BottomrawScreen /> */}
        {/* <ModalScreen /> */}
        
        </>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        flexWrap:'wrap',
        shadowColor: "black",
        elevation: 5,

    },
    text:{
        margin:1
    },
    categoryform:{
        display:'flex',   
        padding:3,
        margin:5    
        
    }
  });
