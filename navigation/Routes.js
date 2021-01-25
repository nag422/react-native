import React, {useContext, useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text } from 'react-native'
import AuthStack from './AuthStack'
import AppStack from './AppStack';





const Routes = ({access,...rest}) => {
    

   
    
    
    
    return (
        <NavigationContainer>
            
            
            {access !== null ? <AppStack /> : <AuthStack />}
            
        </NavigationContainer>
    )
}

export default Routes
