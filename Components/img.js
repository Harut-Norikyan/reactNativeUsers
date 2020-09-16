import React from 'react'
import { View, Image, Button, Alert, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Port from "./port"
import axios from "axios"
import RNFetchBlob from 'rn-fetch-blob'


export default class Img extends React.Component {
  // state = {
  //   photo: null
  // }

  // handleChoosePhoto = () => {
  //   // ImagePicker.launchImageLibrary(options, response => {
  //   ImagePicker.showImagePicker(response => {
  //     if (response.uri) {
  //       console.log(response);
  //       this.setState({
  //         photo: response
  //       })
  //     }
  //   })
  // };

  // handleSignUp = async () => {
  //   let { photo } = this.state;
  //   let data = new FormData();
  //   data.append("photo",JSON.stringify({
  //     uri : photo.path,
  //     name : photo.fileName,
  //     type : photo.type
  //   }));

  //       axios.post(`${Port}/users/add-user`,data, 
  //         { headers:{
  //           "Content-Type": 'multipart/form-data',
  //         }}).then(res => {
  //                 console.log(res, "res");
  //                 this.setState({
  //                     status: res.data.status,
  //                     errors: res.data.errors ? res.data.errors : null,
  //                 });
  //             });
  // };



  state = {
    photo: null,
    name: ""
  }

  handleChoosePhoto = async () => {
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          photo: response
        });
      }
    });
  };

  // handleSignUp = async () => {
  //   RNFetchBlob.fetch('POST', `${Port}/users/add-user`, {
  //     'Content-Type': 'multipart/form-data',
  //   }, [{ name: 'photo', filename: this.state.photo.fileName, data: this.state.pic }]).
  //     then((resp) => {
  //       console.log(resp,"resp");
  //     })
  // };

  handleSignUp = async () => {
    let {name} = this.state
    // axios.post(`${Port}/users/add-user`,{ name : name}).then(res=>console.log(res,"123"))
    RNFetchBlob.config({
      fileCache: true,
    }).fetch('POST', `${Port}/users/add-user`,{
      'Content-Type': 'multipart/form-data',
    }, [{ name: 'photo', filename: this.state.photo.fileName, data: this.state.photo.data }]).
      then((resp) => {
        console.log(resp, "resp");
      })
  };

  render() {
    const { photo } = this.state
    console.log(this.state.name);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <TextInput
          value={this.state.name}
          placeholder="Name!"
          onChangeText={(text) => this.setState({ name: text })}
        />
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Button title="Upload" onPress={this.handleSignUp} />

      </View>
    )
  }
}

