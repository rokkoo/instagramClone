import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation';

import { MainFeed, Camera, Profile } from './../screens'
import { Ionicons } from '@expo/vector-icons';

/** Material */
// export default createMaterialBottomTabNavigator ({
//     Home: { 
//         screen: MainFeed,
//         navigationOptions: {
//             tabBarLabel: 'Home',
//             tabBarIcon: ({tintColor}) => (
//                 <Ionicons name='ios-home' color={tintColor} size={24} />
//             )
//         }
//      },
//     Camera: { screen: Camera },
//     Profile: { screen: Profile }
// },{
//     initialRouteName: 'Home',
//     order: ['Home', 'Profile', 'Camera'],
//     activeTintColor: 'white'
// })

export default createBottomTabNavigator(
    {
      Home: MainFeed,
      Camera: Camera,
      Profile: Profile
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = `ios-home`;
          } else if (routeName === 'Camera') {
            iconName = `ios-camera`;
          }else if (routeName === 'Profile') {
              iconName = `ios-person`
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false
      },
    }
  );