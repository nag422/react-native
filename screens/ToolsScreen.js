import React from 'react'
import { View, Text } from 'react-native'
import AppbarScreen from './AppbarScreen'

const ToolsScreen = (props) => {
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Tools" subtitle="Newest"/>
        <View>
            <Text>Tools Screen</Text>
        </View>
        </>
    )
}

export default ToolsScreen
