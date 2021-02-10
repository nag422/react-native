import React,{ useCallback } from 'react'
import { View, Text,StyleSheet,Button } from 'react-native'
import AppbarScreen from './AppbarScreen'
import { Avatar,Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import { AuthContext } from '../contexts/AuthContext';
const ProfileScreen = (props) => {
    const { logout,userdata } = React.useContext(AuthContext)
   
   

    
    const LeftContent = props => <Avatar.Image size={60} source={{uri:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}} {...props} />
    const LeftSecurityContent = props => <Avatar.Icon {...props} icon="account-lock-outline" />
    
    const supportedURL = "https://app.kiranvoleti.com";
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Profile" />
                 
        <Card style={styles.container}>
        <Card.Title title={userdata.first_name} subtitle={`@${userdata.first_name}(${userdata.usertype})`} left={LeftContent} />
            <Card.Content>           
            
            <View style={styles.profileinfo}>    
            <Text>FirstName: {userdata.first_name}</Text>    
            <Text>LastName: {userdata.last_name}</Text>   
            <Text>Email: {userdata.email}</Text>  
            <Text>Phone: {userdata.phone}</Text>  
            <Text>Joined: {userdata.joined}</Text>  
            {/* {Object.entries(userdata).map(([key,val]) => {
                return (<>
                
                <Text key={key}>{key}: {val}</Text>               
               
                </>)
            })} */}
                
                
            </View>
            </Card.Content>            
            
        </Card>

        {/* <Card style={styles.container}>
        <Card.Title title="Security" subtitle="Reset Password" left={LeftSecurityContent} />
            <Card.Content>           
            
            <View>                
                
                
                <LinkUrlScreen url={supportedURL}>Reset Password</LinkUrlScreen>
            </View>
            </Card.Content>            
            
        </Card>  */}

        <Card style={styles.container}>
        <Card.Title title="Logout" subtitle="Logout" left={LeftSecurityContent} />
            <Card.Content>           
            
            <View>               
                
                
            <Button onPress={() =>logout() } title="Logout" />
            </View>
            </Card.Content>            
            
        </Card>
        
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        
        marginTop:20

    },
    profileinfo:{
        marginLeft:2
    },
    avatar:{
        display:'flex',
        alignContent:"center",
        justifyContent:'flex-end',
        marginLeft:-10
    },
    categoryform:{
        display:'flex',   
        padding:3,
        margin:5    
        
    }
  });
