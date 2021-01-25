import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import DrawerContent from '../screens/DrawerContent'

import {createDrawerNavigator} from '@react-navigation/drawer'
import ArticlesScreen from '../screens/ArticlesScreen';
import VideosScreen from '../screens/VideosScreen';
import ToolsScreen from '../screens/ToolsScreen';
import TrendScreen from './TrendScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ContributeScreen from './ContributeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// import ToptabBarNavigator from '../navigation/ToptabBarNavigator'

const createDrawer = () => {
    return (<Drawer.Navigator initialRouteName="Articles" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component = {FeedStack} />
        {/* <Drawer.Screen name="Home" component = {ToptabBarNavigator} /> */}
        
   
        
    </Drawer.Navigator>)
}

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Articles"
      component={ArticlesScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
        //   fontFamily: 'Kufam-SemiBoldItalic',
          fontSize:18
        },
        headerShown: false,
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        // headerRight: () => (
        //   <View style={{marginRight: 10}}>
        //     <FontAwesome5.Button
        //       name="plus"
        //       size={22}
        //       backgroundColor="#fff"
        //       color="#2e64e5"
        //       onPress={() => navigation.navigate('AddPost')}
        //     />
        //   </View>
        // ),
      }}
    />
    <Stack.Screen
      name="Videos"
      component={VideosScreen}
      
      options={{
        title: 'Videos',
        headerTitleAlign: 'center',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
        
      }}
      
    />

<Stack.Screen
      name="Tools"
      component={ToolsScreen}
      
      options={{
        title: 'Tools',
        headerTitleAlign: 'center',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
        
      }}
    />



    

    

  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <>
    
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>

      <Tab.Screen
        name="Home"
        component={createDrawer}
        
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="grid-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trend"
        component={TrendScreen}
        options={{
          tabBarLabel: 'Trend',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="trending-up-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contribute"
        component={ContributeScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="add-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'User Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      
      
    </Tab.Navigator>
    </>
  );
}

export default AppStack;