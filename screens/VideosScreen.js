import React from 'react'
import { View, Text } from 'react-native'
import AppbarScreen from './AppbarScreen'

const VideosScreen = (props) => {
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Videos" subtitle="Newest"/>
        <View>
            <Text>Video screen</Text>
        </View>
        </>
    )
}

export default VideosScreen
