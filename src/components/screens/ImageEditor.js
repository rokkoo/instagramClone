import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  AsyncStorage
} from "react-native";
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
const ACCESS_TOKEN = "access_token";

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
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!token) console.log("No hay token");
      else {
        return token;
      }
    } catch (error) {
      console.log("Algo ha ido mal con el token de acceso.");
    }
  }

  saveContent = async () => {
    let token = this.getToken();

    token.then(token => {
        this.setState({ saving: true })
        this.savePicture()
        .then(imageRef => {
            console.log(imageRef)
            fetch(config.Api.url + "newPost", {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: this.state.form.description,
                    imageUrl: imageRef,
                    userToken: token
                })
            })
            .then(res => res.json())
            .then(resJson => {
                if(resJson.confirmation === 'success'){
                    this.setState({ saving: false })
                    this.props.navigation.navigate('Home')
                } else console.log('Algo ha ido mal, intentalo lo nuevo.')
            });
        })
        .catch(err => console.log('error cloudinary ' + err))
    });
  };

  savePicture = async () => {
    const base64Img = `data:image/jpg;base64,` + this.state.imageData.base64
    let url
    //Add your cloud name
    let apiUrl = 'https://api.cloudinary.com/v1_1/rokkoo/image/upload';

    let data = {
        "file": base64Img,
        "upload_preset": "u1izwezn",
    }

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resJson => {
        return resJson.secure_url
    })
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
