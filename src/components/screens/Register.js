import React, { Component } from 'react';
import {  View, Text, TextInput, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button } from "react-native-elements";
import config from '../../config';

const Movile_with = Dimensions.get("window").width
const Movile_height = Dimensions.get("window").height

export default class Register extends Component {
constructor(props){
    super(props)
    this.state = {
        credentials: {
        email: "",
        password: ""
        }
    }
}

updateTex(text, field){
    let newCredential = Object.assign(this.state.credentials)
    newCredential[field] = text
    this.setState({
        credentials: newCredential
    })
}

register() {
// this.props.navigation.navigate("Login")
fetch(config.Api.url + 'createuser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.state.credentials),
  })
  .then(data => data.json())
  .then(JsonResponse => {
      if (JsonResponse.confirmation === 'success') {
        this.props.navigation.navigate("Home")
      } else {
          alert('En estos momentos no puedes registrarte 😞')
      }
  })
  .catch(error => alert(error))

// alert(JSON.stringify(this.state.credentials))
// alert(this.state.credentials.passWord)
}
  render() {
    return (
        <View style={{ width:100 + "%",height:100 + "%",justifyContent: "center", alignItems: "center" }}>
        <ImageLoader
          style={{height: Movile_height, width: Movile_with, opacity: 0.9, position: 'absolute', top: 0, left:0}}
          source={{ uri: config.images.login }}
        />
            <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => this.updateTex(text, "email")} 
                autoCorrect={false}
                placeholder="example@example.com"
                value={this.state.credentials.user}
                />
            <TextInput
                style={styles.textInput}
                onChangeText={text => this.updateTex(text, "password")} 
                secureTextEntry
                placeholder="contraseña"
                value={this.state.credentials.passWord}
                />
            <Button onPress={() => this.register()} title="Registrarse" />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft:40,
      paddingRight: 40
    },
    textInput: {
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff',
      paddingLeft: 40,
      paddingRight: 40,
    },
    header: {
      fontSize: 24,
      marginBottom: 60,
      color: 'rgb(45,141,250)',
      fontWeight: 'bold',
    },
    loginBtn: {
      backgroundColor: '#009688',
      borderRadius: 15,
      marginBottom: 20
    },
    registerTxt: {
      color: 'rgb(45,141,250)',
      fontWeight: "900",
    }
  })
  
  class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return (
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            this.props.style,
          ]}
        />
      );
    }
  }