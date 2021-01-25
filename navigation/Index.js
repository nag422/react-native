import React from 'react'
import { View, Text } from 'react-native'
import AuthStack from './AuthStack'
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native'

const Providers = ({theme,isaccesstokenset,...rest}) => {
    
    
    
    return (
        
        <NavigationContainer>
            
            
            {isaccesstokenset != null ? <AppStack /> : <AuthStack />}
        
        </NavigationContainer>
    )
}

export default Providers
