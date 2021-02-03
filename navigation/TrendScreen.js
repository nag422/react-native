import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler'
import {Card} from 'react-native-shadow-cards';

const TrendScreen = ({ navigation }) => {
    const [value, onChangeText] = React.useState('Enter Query');
    const [category, setCategory] = React.useState('Articles')
    const [order, setOrder] = React.useState('newest')
    return (
        <>
        <Button style={{backgroundColor:"#fff",top:3}} onPress={() => navigation.goBack()} title="Close / Back" />
        <View style={styles.container}>
            <Card style={{padding: 10, margin: 10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{marginRight:5}}>Query :</Text>
            <TextInput
                style={{ height: 40, width: 200, borderBottomColor: 'gray', borderBottomWidth:1, borderRadius: 4 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>Select Category : </Text>
                <Picker
        selectedValue={category}
        style={{ height: 50, width: 150,elevation:2 }}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Articles" value="Articles" />
        <Picker.Item label="Videos" value="Videos" />
        <Picker.Item label="Tools" value="Tools" />
      </Picker>
            


       

            </View>
            {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>Order : </Text>
                <Picker
        selectedValue={order}
        style={{ height: 50, width: 150,elevation:2 }}
        onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
      >
        <Picker.Item label="Newest" value="newest" />
        <Picker.Item label="Oldest" value="oldest" />
      </Picker>
            

  
       

            </View> */}

            {/* <Text style={{ fontSize: 30 }}>This is a modal!</Text> */}
            <Button onPress={() => navigation.navigate(category,{query:value})} title="Search" />
            </Card>
        </View>
        </>
    )
}

export default TrendScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333396'

    },
    searchinputext: {
        height: 60,
        elevation: 1,
        borderColor: 'black',
        borderWidth: 4
    }
})
