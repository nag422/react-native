import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ExploreScreen from '../screens/ExploreScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import ToolsScreen from '../screens/ToolsScreen';
import VideosScreen from '../screens/VideosScreen';
import ProfileScreen from '../screens/ProfileScreen';


const ToolsRoute = () => <ToolsScreen />;

const ArticlesRoute = () => <ArticlesScreen />;

const VideosRoute = () => <VideosScreen />;

const ExploreRoute = () => <ExploreScreen />;

const ProfileRoute = () => <ProfileScreen />;

const BottomMaterialbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    
    { key: 'Articles', title: 'Articles', icon: 'file-multiple-outline' },
    { key: 'Videos', title: 'Videos', icon: 'video-outline' },
    { key: 'Tools', title: 'Tools', icon: 'wrench-outline' },    
    { key: 'Explore', title: 'Explore', icon: 'view-grid-outline' },
    { key: 'Profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Articles: ArticlesRoute,
    Tools: ToolsRoute,    
    Videos: VideosRoute,
    Explore: ExploreRoute,
    Profile: ProfileRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomMaterialbar;