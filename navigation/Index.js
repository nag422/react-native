import React from 'react'
import { View, Text } from 'react-native'
import AuthStack from './AuthStack'
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native'

const Providers = ({theme,isaccesstokenset,...rest}) => {
    
    
    
    return (
        
        <NavigationContainer>           
            
            <AppStack isaccesstokenset={isaccesstokenset} />
        
        </NavigationContainer>
    )
}

export default Providers
