import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import config from './config/index';
import {PostFeed} from './components/containers'
class InstaClone extends React.Component {
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
    /** 410 / 365 = 1.10  => Math.floor - redondeamos el resultado */
    const imageHeight = Math.floor(this.state.screenWidth * 1.10)
    const imageUri = "https://lh3.googleusercontent.com/7aGIQrv8qiCgIwVdZNAxrYVftyPe6ZHFmcKBqxObUYOklmrqcx4VxeojuJCoN7lN-qycgONBTtn2eFgQOtZuCtmy6g" + "=s" + imageHeight + "-c"
    const likeColor = this.state.liked ? "rgb(252, 61, 57)" : null
    return (
      <View style={Styles.container}>
        <View style={Styles.top}>
          <Text>Instagram</Text>
        </View>
        <PostFeed />
      </View>
    )
  };
}

/** Styles */
const Styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default InstaClone