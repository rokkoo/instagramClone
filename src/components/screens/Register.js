import React, { Component } from 'react';
import {  View, Text, Button, TextInput } from 'react-native';
import config from '../../config';

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
          alert('En estos momentos no puedes registrete 😞')
      }
  })
  .catch(error => alert(error))

// alert(JSON.stringify(this.state.credentials))
// alert(this.state.credentials.passWord)
}
  render() {
    return (
        <View style={{ width:100 + "%",height:100 + "%",justifyContent: "center", alignItems: "center" }}>
            <TextInput
                style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                onChangeText={text => this.updateTex(text, "email")} 
                autoCorrect={false}
                value={this.state.credentials.user}
             />
            <TextInput
                style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                onChangeText={text => this.updateTex(text, "password")} 
                secureTextEntry
                value={this.state.credentials.passWord}
             />

            <Button onPress={() => this.register()} title="Registrarse" />
         </View>
    );
  }
}

