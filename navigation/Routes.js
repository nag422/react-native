import React, {useContext, useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text } from 'react-native'
import AuthStack from './AuthStack'
import AppStack from './AppStack';



const Routes = () => {
    const i = true;
    return (
        <NavigationContainer>
            
            
            {i ? <AppStack /> : <AuthStack />}
            
        </NavigationContainer>
    )
}

export default Routes
