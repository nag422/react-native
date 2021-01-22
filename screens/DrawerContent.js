import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const DrawerContent = (props) => {
    return (
        <View style={{flex:1}}>
           <DrawerContentScrollView {...props}>
               <View style={styles.drawerContent}>
                   <View style={styles.userInfoSection}>
                   <Avatar.Image size={60} source={{uri:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}} />
                   <View>
                       <Title style={styles.title}>Nagendra Kumar</Title>
                       <Caption style={styles.caption}>@nagendra(user)</Caption>
                   </View>
                   </View>
               </View>
           </DrawerContentScrollView>
           <Drawer.Section style={StyleSheet.bottomDrawerSection}>
                <DrawerItem 
                icon={({color,size}) => (
                    <Icon 
                        name="exit-to-app"
                        color={color}
                        size={size}
                     />

                    
                )}
                label="Sign Out" 
                onPress={() => {}}
                />
           </Drawer.Section>
        </View>
    )
}

export default DrawerContent
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1
    },
    userInfoSection: {
      paddingLeft: 20,
      paddingTop:20
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });