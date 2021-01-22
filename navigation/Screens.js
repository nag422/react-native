import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Customedrawermenu from './Menu'

import Login from "../screens/Login";
import Onboarding from "../screens/Onboarding";
import Register from "../screens/Register";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function OnboardingStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          option={{
            headerTransparent: true
          }}
        />
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    );
  }

  export function LoginStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen
          name="Login"
          component={Login}
          option={{
            headerTransparent: true
          }}
        />


        <Stack.Screen
          name="Register"
          component={Register}
          option={{
            headerTransparent: true
          }}
        />
        
        
      </Stack.Navigator>
    );
  }

  function AppStack(props) {
    return (
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={props => <Customedrawermenu {...props} />}
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8
        }}
        drawerContentOptions={{
          activeTintcolor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.75,
            backgroundColor: "transparent",
            paddingVertical: 16,
            paddingHorizonal: 12,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            overflow: "hidden"
          },
          labelStyle: {
            fontSize: 18,
            marginLeft: 12,
            fontWeight: "normal"
          }
        }}
        initialRouteName="Onboarding"
      >
        <Drawer.Screen name="Onboarding" component={Onboarding} />
        <Drawer.Screen name="Login" children={Login} />
 
      </Drawer.Navigator>
    );
  }