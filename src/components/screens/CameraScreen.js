import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from "expo";
class CameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async function() {
    console.log('====================================');
    console.log('entra');
    console.log('====================================');
    if (this.camera) {
        let photo = await this.camera.takePictureAsync();
        let resizedPhoto = await ImageManipulator.manipulate(
            photo.uri,
            [{ resize: { width: 108, height: 192 } }],
            { compress: 0, format: "jpg", base64: false }
        );
        FileSystem.moveAsync({
            from: resizedPhoto.uri,
            to: `${FileSystem.documentDirectory}photos/Photo_${
                this.state.photoId
            }.jpg`
        });
        this.setState({ photoId: this.state.photoId + 1 });
        Vibration.vibrate();            
    }
};

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={ { flex: 1 }} type={this.state.type} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraScreen;
