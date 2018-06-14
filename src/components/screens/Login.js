import React, { Component } from 'react';
import { View, TextInput, Animated, Dimensions, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import { Container, Button ,Text ,Footer } from 'native-base';
import config from '../../config';

const Movile_with = Dimensions.get("window").width
const Movile_height = Dimensions.get("window").height
const ACCESS_TOKEN = 'access_token'


class Login extends Component {

componentWillMount() {
  this.getToken()
}
constructor(props){
  super(props)
  this.state = {
    credentials :{
      email: "",
      password: ""
    }
  }
}


async storeToken(accessToken) {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
  } catch (error) {
    console.log('Algo ha ido mal con el token de acceso.')
  }
}

async getToken() {
  try {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if (!token) console.log('No hay token')
    else{      
      this.props.navigation.navigate('Home')
    } 
  } catch (error) {
    console.log('Algo ha ido mal con el token de acceso.')
  }
}

updateTex(text, field){
  let newCredential = Object.assign(this.state.credentials)
  newCredential[field] = text.toLowerCase()
  this.setState({
      credentials: newCredential
  })
}

  login(){    
    fetch(config.Api.url + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(res => res.json())
    .then(resJson => {
    // Alert.alert("Welcome, "+ res.user.username, " Te has conectado con exito")
      if(resJson.confirmation === 'success'){
        this.props.navigation.navigate("Home")
        this.storeToken(resJson.token)
      } else console.log('Algo ha ido mal, intentalo lo nuevo.')
    })
  }
  
  render() {
    return (
      <Container>
      <View style={styles.container}>
        <ImageLoader
          style={{height: Movile_height, width: Movile_with, opacity: 0.9, position: 'absolute', top: 0, left:0}}
          source={{ uri: config.images.login }}
        />

        <Text style={styles.header}>AlfonsoGram</Text>
        <TextInput 
        style={styles.textInput}
        autoCorrect
        placeholder="example@example.com"
        onChangeText= {(text) => this.updateTex(text, "email")}
        value={this.state.credentials.email}
        />
        <TextInput 
        placeholder='Contraseña'
        style={styles.textInput}
        secureTextEntry
        onChangeText= {text => this.updateTex(text, "password")}
        value={this.state.credentials.password}
        />
        <TouchableOpacity 
        style={styles.loginBtn}
          onPress= {() => this.login()}
        >
        <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <Footer style={styles.Footer} >
        <Button
          onPress={() => {this.props.navigation.navigate('Register')}} transparent block >
          <Text uppercase={false} fontWeight={false} style={styles.footertext}>No tienes cuenta? <Text style={styles.signup}>Registrate</Text></Text>
        </Button>
      </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:40,
    paddingRight: 40
  },
  header :{
    fontSize: 45,
    marginBottom: 30,
    fontFamily : 'Billabong',
    color: 'black',
    fontSize :60,
           
},
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingLeft: 40,
    paddingRight: 40,
  },
  loginBtn: {
    alignSelf : 'stretch',
    padding : 15,
    alignItems : 'center',
    backgroundColor:'#ffffff',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'black'
  },
  registerTxt: {
    color: 'rgb(45,141,250)',
    fontWeight: "900",
  },
  footer:{
    borderTopWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor:"#ffffff",
    alignItems: "center",
   },
   footertext:{
    fontSize:14,
    color:'#d0d0d0',
    fontWeight:'normal',
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

export default Login;
