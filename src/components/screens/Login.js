import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Login extends Component {
  login(){
    this.props.navigation.navigate("main")
  }
  render() {
    return (
      <View style={{ width:100 + "%",height:100 + "%",justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity 
          onPress={() => this.login()}
        >
          <Text> Login page </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
