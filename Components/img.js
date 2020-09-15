import React from 'react'
import { View, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Port from "./port"
import axios from "axios"

export default class Img extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    // ImagePicker.launchImageLibrary(options, response => {
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        console.log(response);
        this.setState({
          photo: response
        })
      }
    })
  };


  handleSignUp = async () => {
    let { photo } = this.state;

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append("name", "John")
    // data.append('photo', JSON.stringify({
    //   uri: photo.uri,
    //   type: photo.type,
    //   name: photo.fileName,
    // }));

    axios.post(`${Port}/users/add-user`, formData,
      {
        headers: {
          "Content-Type": 'multipart/form-data', 
          'Accept': 'application/json',
        }
      }
    ).then(res => {
      console.log(res, "res");
      this.setState({
        status: res.data.status,
        errors: res.data.errors ? res.data.errors : null,
      });
    });
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
        <Button title="Upload" onPress={this.handleSignUp} />

      </View>
    )
  }
}