import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import ArticlesScreen from '../screens/ArticlesScreen';
import VideosScreen from '../screens/VideosScreen';
import ToolsScreen from '../screens/ToolsScreen';

export default function ToptabBarNavigator() {
  return (
   
    <Tab.Navigator>
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Videos" component={VideosScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
    </Tab.Navigator>
    
  );
}