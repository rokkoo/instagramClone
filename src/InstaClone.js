import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { MainFeed,Login,Profile,Camera } from './components/screens'

const Tabs = createMaterialBottomTabNavigator({
  Home: { screen: MainFeed },
  Camera: { screen: Camera },
  Profile: { screen: Profile }
},{
  initialRouteName: 'Home',
  order: ['Home', 'Camera', 'Profile'],
  activeTintColor: 'orange'
})

const MainStack = createSwitchNavigator({
  login: {screen:Login},
  main: Tabs
})
class InstaClone extends React.Component {
  render() {
      return(
        <MainStack />
      )
  };
}


export default InstaClone