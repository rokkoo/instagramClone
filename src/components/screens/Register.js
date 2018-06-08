import React, { Component } from 'react';
import {  View, Text, Button, TextInput } from 'react-native';

export default class Register extends Component {
constructor(props){
    super(props)
    this.state = {
        credentials: {
        user: "",
        passWord: ""
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
this.props.navigation.navigate("Login")
}
  render() {
    return (
        <View style={{ width:100 + "%",height:100 + "%",justifyContent: "center", alignItems: "center" }}>
            <TextInput
                style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                onChange={(text) => this.updateTex("text", "login")} 
                value={this.state.credentials.user}
             />
            <TextInput
                style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                onChange={(text) => this.updateTex("text", "passWord")} 
                value={this.state.credentials.passWord}
             />

            <Button onPress={() => this.register()} title="Registrarse" />
         </View>
    );
  }
}

