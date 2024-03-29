import React, { useState, useContext } from "react";
import { View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import { Asset } from "expo-asset";

import ProfileScreen from "../screens/ProfileScreen";

import ArticlesScreen from "../screens/ArticlesScreen";
import VideosScreen from "../screens/VideosScreen";
import ToolsScreen from "../screens/ToolsScreen";
import TrendScreen from "./TrendScreen";
import ExploreScreen from "../screens/ExploreScreen";
import WebviewScreen from "../screens/WebviewScreen";

import { AuthContext } from "../contexts/AuthContext";

// import Screens from "./navigation/Screens";
import Login from "../screens/Login";
import Register from "../screens/Register";
import PaymentScreen from "../screens/PaymentScreen";
import LoadingScreen from "../screens/LoadingScreen";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// import ToptabBarNavigator from '../navigation/ToptabBarNavigator'

// const createDrawer = () => {
//     return (<Drawer.Navigator  drawerContent={props => <DrawerContent {...props} />}>

//         <Drawer.Screen name="Home" component = {BottomMaterialbar} />
//         <Drawer.Screen name="Explore" component = {ExploreScreen} />
//         <Drawer.Screen name="Profile" component = {ProfileScreen} />
//         <Drawer.Screen name="Articles" component = {ArticlesScreen} />
//         <Drawer.Screen name="Videos" component = {VideosScreen} />
//         <Drawer.Screen name="Tools" component = {ToolsScreen} />

//     </Drawer.Navigator>)
// }

// cache app images

const assetImages = [];
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const AppStack = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { isuserSignedin } = useContext(AuthContext);
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  let [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../assets/font/Raleway-Regular.ttf"),
    "Raleway-Black": require("../assets/font/Raleway-Black.ttf"),
    "Raleway-Bold": require("../assets/font/Raleway-Bold.ttf"),
    "Raleway-SemiBold": require("../assets/font/Raleway-SemiBold.ttf"),
  });

  

 

  function _loadResourcesAsync() {
    // console.log('images loaded')
    // return Promise.all([...cacheImages(assetImages)]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // console.warn(error);
  }

  function _handleFinishLoading() {
    setLoadingComplete(true);
  }

  if (!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else if (fontsLoaded) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
         
        }}
      >
        {isuserSignedin ? (
          <>
            

            <Stack.Screen
              name="Home"
              component={FeedStack}
              options={{
                title: ' ',
                headerTitleAlign: "left",
                headerTitleStyle: {
                  color: "#2e64e5",
                  //   fontFamily: 'Kufam-SemiBoldItalic',
                  fontSize: 8,
                },
                headerShown: true,
                headerStyle: {
                  backgroundColor:'#fff',
                  shadowColor: "#fff",
                  elevation: 5,
                  height:30
                },
              }}
            />

            <Stack.Screen
              name="Articles"
              component={ArticlesScreen}
              options={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  color: "#2e64e5",
                  //   fontFamily: 'Kufam-SemiBoldItalic',
                  fontSize: 18,
                },
                headerShown: false,
                headerStyle: {
                  shadowColor: "#fff",
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
                title: "Videos",
                headerTitleAlign: "center",
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#2e64e515",
                  shadowColor: "#2e64e515",
                  elevation: 0,
                },
                transitionConfig: () => fromLeft(),
                headerBackTitleVisible: false,
                headerBackImage: () => (
                  <View style={{ marginLeft: 15 }}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                  </View>
                ),
              }}
            />

            <Stack.Screen
              name="Tools"
              component={ToolsScreen}
              options={{
                title: "Tools",
                headerTitleAlign: "center",
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#2e64e515",
                  shadowColor: "#2e64e515",
                  elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                  <View style={{ marginLeft: 15 }}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                  </View>
                ),
              }}
            />

            {/* <Stack.Screen
      name="exploretrig"
      component={TrendScreen}
      
      options={{
        title: 'exploretrig',
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
    /> */}

            <Stack.Screen
              name="webview"
              component={WebviewScreen}
              options={{
                title: " ",
                headerTitleAlign: "center",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#2e64e515",
                  shadowColor: "#2e64e515",
                  elevation: 0,
                  height:30
                },
                // headerBackTitleVisible: false,
                headerBackImage: () => (
                  <View style={{ marginLeft: 15 }}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                  </View>
                ),
              }}
            />
          </>
        ) : (
          <>
           

            <Stack.Screen
              name="Login"
              component={Login}
              option={{
                headerShown: false,
                headerTransparent: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              option={{
                headerTransparent: true,
                headerShown: false,
              }}
            />



          </>
        )}
      </Stack.Navigator>
    );
  } else {
    return null;
  }
};

const FeedStack = ({ isaccesstokenset, ...rest }) => {
  const { userdata } = useContext(AuthContext);

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#2e64e5",
        }}
      >
        {+userdata.tier == 1 || +userdata.tier >= 2 ? (
          <Tab.Screen
            name="Articles"
            component={ArticlesScreen}
            options={{
              tabBarLabel: "Articles",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="file-multiple-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        ) : null}

        {+userdata.tier == 1 || +userdata.tier >= 2 ? (
          <Tab.Screen
            name="Videos"
            component={VideosScreen}
            options={{
              tabBarLabel: "Videos",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="video-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        ) : null}

        {+userdata.tier >= 2 ? (
          <Tab.Screen
            name="Tools"
            component={ToolsScreen}
            options={{
              tabBarLabel: "Tools",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="wrench-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        ) : null}
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen
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
      /> */}
        {/*
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
      /> */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "User Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            tabBarLabel: "Payment",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="card" color={color} size={size} />
              
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppStack;
