import React,{ useCallback } from 'react'
import { View, Text,StyleSheet,Linking } from 'react-native'
import AppbarScreen from './AppbarScreen'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import LinkUrlScreen from './LinkUrlScreen'
const ProfileScreen = (props) => {
    const LeftContent = props => <Avatar.Image size={60} source={{uri:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}} {...props} />
    const LeftSecurityContent = props => <Avatar.Icon {...props} icon="account-lock-outline" />
    
    const supportedURL = "https://app.kiranvoleti.com";
    return (
        <>
        <AppbarScreen navigation={props.navigation} title="Profile" />
                 
        <Card style={styles.container}>
        <Card.Title title="Profile" subtitle="@nagendra (Admin)" left={LeftContent} />
            <Card.Content>           
            
            <View style={styles.profileinfo}>                
                <Text>First Name: nagendra</Text>
                <Text>Last Name: Kumar</Text>
                <Text>Phone No: 9832342436</Text>
                <Text>Email: nagendrakumar422@gmail.com</Text>
                
            </View>
            </Card.Content>            
            
        </Card>

        <Card style={styles.container}>
        <Card.Title title="Security" subtitle="Reset Password" left={LeftSecurityContent} />
            <Card.Content>           
            
            <View>                
                
                
                <LinkUrlScreen url={supportedURL}>Reset Password</LinkUrlScreen>
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
