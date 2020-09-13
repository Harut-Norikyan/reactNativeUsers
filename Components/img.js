import React from 'react'
import { View, Text, Image, Button, Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker'

export default class Img extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    let { photo } = this.state
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        photo = response
        const data = new FormData();
        data.append("image",photo)
      }
    })
  };
  
  
  render() {

    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Button title="Upload" onPress={this.handleChoosePhoto} />

      </View>
    )
  }
}