import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import config from '../../config';
/** Creamos cada post que tengamos guardado */
class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /** Calculamos el ancho de la pantalla  */
      liked: false,
      screenWidth: Dimensions.get('window').width
    }
  }

  /** Se encarga de cambiar el estado si presionamos la imagen */
  likeTogled() {
    this.setState({
      liked: !this.state.liked
    })
  }
  render() {
    /** 410 / 365 = 1.10  => Math.floor - redondeamos el resultado */
    const imageHeight = Math.floor(this.state.screenWidth * 1.10)
    const selectedImg = this.props.item % 2 == 0 ?"https://lh3.googleusercontent.com/1mrobnvOwuyRtTSSWaHVHMkp3cAjA2SVN-s6O9NdbcZfr3Hd06imTTlcp-fVKngZf-J5nvMrMwnIvuewM-CmpmbC" :
    "https://lh3.googleusercontent.com/7aGIQrv8qiCgIwVdZNAxrYVftyPe6ZHFmcKBqxObUYOklmrqcx4VxeojuJCoN7lN-qycgONBTtn2eFgQOtZuCtmy6g"
    const imageUri = selectedImg + "=s" + imageHeight + "-c"
    const likeColor = this.state.liked ? "rgb(252, 61, 57)" : null
    return (
        <View style={{flex: 1, width: 100 + "%"}}>
            <View style={Styles.userBar}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                style={Styles.userPict}
                source={{
                    uri: "https://lh3.googleusercontent.com/QBF8vw7rFOi4mhmyrsyGRFyVkO8nU455yiDNA-jWQr4pf2cSUkUm7lZ73NrKJ4Duj5RKhBJXYqbQ2wlAEIw2K2Jh"
                }}
                />
                <Text style={{ marginLeft: 5 }}>Alfonso Aguirre</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>...</Text>
            </View>
            </View>
            <Image
            style={{ width: this.state.screenWidth, height: 400 }}
            source={{
                uri: imageUri
            }}
            />
            <View style={Styles.iconsBar}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                this.likeTogled()
                }}
            >
                <Image
                style={[Styles.icon, { width: 45, height: 45, tintColor: likeColor }]}
                source={config.images.heartIcon}
                />
            </TouchableOpacity>
            <Image
                style={[Styles.icon, { width: 36, height: 36 }]}
                source={config.images.topicIcon}
            />
            <Image
                resizeMode="stretch"
                style={[Styles.icon, { width: 50, height: 40 }]}
                source={config.images.backIcon}
            />
            </View>
            <View style={Styles.commentBar}>
            <Image
                style={[Styles.icon, { width: 30, height: 30 }]} 
                source= {config.images.heartIcon}
                />
                <Text style={{ fontWeight: "bold" }}>125 me gusta</Text>
            </View>
        </View>
    )
  };
}

/** Styles */
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%"
  },
  top: {
    width: 100 + "%",
    height: 56,
    marginTop: 20,
    backgroundColor: "rgb(250, 250, 250)",
    borderBottomColor: "rgb(233, 233, 233)",
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBar: {
    width: 100 + "%",
    height: config.styleConstants.rowHeight,
    backgroundColor: "rgb(250, 250, 250)",
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  userPict: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconsBar: {
    width: 100 + "%",
    height: config.styleConstants.rowHeight,
    borderColor: "rgb(233, 233, 233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row"
  },
  icon: {
    marginLeft: 5,
    alignItems: 'center',
  },
  commentBar:{
    alignItems: "center",
    width: 100 + "%",
    height: config.styleConstants.rowHeight,
    borderColor: "rgb(233, 233, 233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    marginLeft: 7
  }
})

export default Post