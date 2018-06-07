import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Profile extends Component {
  render() {
    return (
        <View style={{ width:100 + "%",height:100 + "%",justifyContent: "center", alignItems: "center" }}>
            <Text> Profile page </Text>
        </View>
    );
  }
}

export default Profile;
