import React from 'react';
import { Chip } from 'react-native-paper';
const ChipScreen = ({...rest}) => {
   
const randomstring = (index) => {
    if(+index > 4){index = 1}
    let arraynew = ['digital','social','media','Newsmaking']

    return arraynew[index]
}
    
    
    
    return(
  <Chip style={{padding:10}} onPress={() => console.log('Pressed')} {...rest}>
     {randomstring(Math.floor(Math.random() * 4))}
            </Chip>
)};

export default ChipScreen;