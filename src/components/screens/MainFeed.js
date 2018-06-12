import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';

import config from './../../config/index';
import {PostFeed} from './../containers'
class MainFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /** Calculamos el ancho de la pantalla  */
      liked: false,
      screenWidth: Dimensions.get('window').width
    }
  }

  /** Se encarga de cambiar el estado si presionamos la imagen */
  likeTogled() {
    this.setState({
      liked: !this.state.liked
    })
  }
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.top}>
          <Text style={{fontFamily: 'Billabong', paddingTop: 10, fontSize: 30}}>AlfonsoGram</Text>
        </View>
        <PostFeed />
      </View>
    )
  };
}

/** Styles */
const Styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    height: 100 + "%"
  },
  top: {
    width: 100 + "%",
    height: 56,
    marginTop: 20,
    backgroundColor: "rgb(250, 250, 250)",
    borderBottomColor: "rgb(233, 233, 233)",
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MainFeed