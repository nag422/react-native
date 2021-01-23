import React from 'react'
import { View, Text } from 'react-native'
import AppbarScreen from './AppbarScreen'

const ProfileScreen = (props) => {
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Profile" />
        <View>            
            <Text>Profile Screen</Text>
        </View>
        </>
    )
}

export default ProfileScreen
