import React from 'react'
import { View, Image, Button, Alert } from 'react-native'
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
    avatarSourse : null,
    pic : null
  }

  handleChoosePhoto = async() => {
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
          pic:response.data
        });
      }
    });
  };

  handleSignUp = async () => {
    RNFetchBlob.fetch('POST',`${Port}/users/add-user`, {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data',
    }, [
      // element with property `filename` will be transformed into `file` in form data
      { name : 'photo', filename : 'avatar.png', data: this.state.pic}
      
    ]).then((resp) => {
     console.log(resp);
    })
  };


  render() {
    const { avatarSourse } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.avatarSours && (
          <Image
            source={{avatarSource}}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Button title="Upload" onPress={this.handleSignUp} />

      </View>
    )
  }
}

