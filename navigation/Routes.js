import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
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
