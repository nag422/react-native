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
import { AuthContext } from '../contexts/AuthContext';

const DrawerContent = (props) => {
  const {logout} = React.useContext(AuthContext) 
    return (
        <View style={{flex:1}}>
           <DrawerContentScrollView {...props}>
               <View style={styles.drawerContent}>
                 
                   <View style={styles.userInfoSection}>
                   <View style={{flexDirection:'row',marginTop:15}}>
                   <Avatar.Image size={60} source={{uri:'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'}} />
                   <View style={{flexDirection:'column',marginLeft:15}}>
                       <Title style={styles.title}>Nagendra Kumar</Title>
                       <Caption style={styles.caption}>@nagendra(user)</Caption>
                   </View>
                   </View>

                   <View style={styles.row}>
                     <View style={styles.section}>
                       <Paragraph style={[styles.paragraph,styles.caption]}>
                         80
                       </Paragraph>
                       <Caption style={styles.caption}>Following
                       </Caption>
                     </View>

                     <View style={styles.section}>
                       <Paragraph style={[styles.paragraph,styles.caption]}>
                         100
                       </Paragraph>
                       <Caption style={styles.caption}>Followers
                       </Caption>
                     </View>

                   </View>
                   </View>

                   <Drawer.Section style={StyleSheet.drawerSection}>
                      <DrawerItem 
                      icon={({color,size}) => (
                          <Icon 
                              name="home-outline"
                              color={color}
                              size={size}
                          />

                          
                      )}
                      label="Home" 
                      onPress={() => {props.navigation.navigate('Home')}}
                      />
                       <DrawerItem 
                      icon={({color,size}) => (
                          <Icon 
                              name="file-multiple-outline"
                              color={color}
                              size={size}
                          />

                          
                      )}
                      label="Articles" 
                      onPress={() => {props.navigation.navigate('Articles')}}
                      />
                       <DrawerItem 
                      icon={({color,size}) => (
                          <Icon 
                              name="video-outline"
                              color={color}
                              size={size}
                          />

                          
                      )}
                      label="Videos" 
                      onPress={() => {props.navigation.navigate('Videos')}}
                      />
                       <DrawerItem 
                      icon={({color,size}) => (
                          <Icon 
                              name="wrench-outline"
                              color={color}
                              size={size}
                          />

                          
                      )}
                      label="Tools" 
                      onPress={() => {props.navigation.navigate('Tools')}}
                      />
                       <DrawerItem 
                      icon={({color,size}) => (
                          <Icon 
                              name="account"
                              color={color}
                              size={size}
                          />

                          
                      )}
                      label="Profile" 
                      onPress={() => {props.navigation.navigate('Profile')}}
                      />
           </Drawer.Section>
           {/* For Future */}
           {/* <Drawer.Section title="Settings">
             <TouchableRipple onPress={()=>{}}>
               <View style={styles.preference}>
                 <Text>Dark Theme</Text>
                 <View pointerEvents="none">
                   <Switch value={''} />
                 </View>
               </View>
             </TouchableRipple>
           </Drawer.Section> */}
           {/* For Future */}
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
                onPress={() => {logout()}}
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