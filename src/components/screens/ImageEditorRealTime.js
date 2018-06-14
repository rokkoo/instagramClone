import React, { Component } from "react";
import { Dimensions, StyleSheet, Image, View, AsyncStorage } from "react-native";
import * as firebase from "firebase";
import {
  Text,
  Container,
  Header,
  Footer,
  Button,
  Input,
  Item,
  Label,
  Form,
  Content,
  Left,
  Title,
  Subtitle,
  Body,
  Right,
  Icon,
  Spinner
} from "native-base";
import config from "../../config";

const Movile_with = Dimensions.get("window").width;
const Movile_height = Dimensions.get("window").height;
const ACCESS_TOKEN = 'access_token'

class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: this.props.navigation.getParam("imageData"),
      saving: false,
      form: {
        description: ""
      }
    };
  }

  updateDescription = (text, field) => {
    let newForm = Object.assign(this.state.form);
    newForm[field] = text;
    this.setState({
      form: newForm
    });
  };

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN)
      if (!token) console.log('No hay token')
      else{      
        return token
    } 
    } catch (error) {
      console.log('Algo ha ido mal con el token de acceso.')
    }
  }

  saveContent = async () => {
    let token = this.getToken()

    token.then(token => {
        this.savePost(token)
        .then(key => {
            this.savePicture(key)
            .then(imageUrl => {
                firebase.database().ref(`/posts/${key}`).set({
                    description: this.state.form.description,
                    post_img : imageUrl
                  })
                  .then(() => {
                    //Todo se ha guardado todo correctamente en bd
                    this.setState({ saving: false })
                    this.props.navigation.navigate('Home')
                  })
              })
              .catch(err => console.log("No se ha podido guardar la imagen ",err));
        })
        .catch(error => console.log("No se ha podido guardar el post ", error))
    })
  };

  savePost = async (token) => {
    this.setState({ saving: true })
    let newPostKey = firebase.database().ref().child('posts').push().key //Creamos una key unica
    let newPost = firebase.database().ref().child('user-posts/' + token)

    newPost.push({id: newPostKey})
    return newPostKey
  }

  savePicture = async (imagename) => {
    const response = await fetch(this.state.imageData.uri);
    const blob = await response.blob();
    let ref = firebase.storage().ref().child("posts_images/" + imagename);
    ref.put(blob);
    return ref.fullPath
  };

  render() {
    let { ImageData } = this.state;
    const image64 = `data:image/jpg;base64,` + this.state.imageData.base64;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Camera")}
            >
              <Icon name="arrow-back" />
              <Text>Camara</Text>
            </Button>
          </Left>
          <Body>
            <Title>Foto</Title>
            <Subtitle>Selecciona una foto</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => this.saveContent()}>
              <Text>Publicar</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Image style={styles.image} source={{ uri: image64 }} />
            <Item last>
              <Input
                value={this.state.description}
                placeholder="Descripción"
                onChangeText={text => {
                  this.updateDescription(text, "description");
                }}
              />
            </Item>
          </Form>
          {this.state.saving && (
            <View style={styles.spinner}>
              <Spinner color="green" />
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Movile_with,
    height: Movile_height
  },
  image: {
    height: 400,
    width: Movile_with * 1.1
  },
  form: {
    flex: 1,
    flexDirection: "row"
  },
  loading: {
    height: Movile_height,
    width: Movile_with,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  }
});

export default ImageEditor;
