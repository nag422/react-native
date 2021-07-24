import React from 'react'
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native'

const Providers = ({theme,...rest}) => {
    
    
    
    return (
        
        <NavigationContainer>           
            
            <AppStack />
        
        </NavigationContainer>
    )
}

export default Providers
