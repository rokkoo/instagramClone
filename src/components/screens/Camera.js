import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Camera extends Component {
  render() {
    return (
        <View style={{ width:100 + "%",height:100 + "%",justifyContent: 'center', alignItems: "center" }}>
            <Text> Camera page </Text>
        </View>
    );
  }
}

export default Camera;
