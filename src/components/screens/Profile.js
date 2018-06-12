import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ACCESS_TOKEN = 'access_token'

class Profile extends Component {
  async logout() {
    await AsyncStorage.removeItem(ACCESS_TOKEN)
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
        <View style={{ width:100 + "%",height:100 + "%",justifyContent: "center", alignItems: "center" }}>
            <Text> Profile page </Text>
          <TouchableOpacity 
            onPress= {() => this.logout()}
          >
            <Ionicons name='ios-log-out' size={60} />
          </TouchableOpacity>
        </View>
    );
  }
}

export default Profile;
