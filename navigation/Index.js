import React from 'react'
import { View, Text } from 'react-native'
import Routes from './Routes'
const Providers = ({theme,...rest}) => {
    return (
        <Routes theme={theme} />
    )
}

export default Providers
