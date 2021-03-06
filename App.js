import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Font } from "expo";
import * as firebase from 'firebase'
import InstaClone from "./src/InstaClone";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import config from './src/config';
import RNCloudinary from 'react-native-cloudinary'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }

    //Inicializamos firebase
    firebase.initializeApp(config.Api.firebaseConfig)
  }
  async componentWillMount(){
    await Font.loadAsync({
      Billabong: require('./assets/Billabong.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
      Icon: require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')
    })
    this.setState({ isReady: true })
  }
  render() {
      const { isReady } = this.state
      return !isReady ? <AppLoading /> : <InstaClone />
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
