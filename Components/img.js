import React from 'react'
import { View, Image, Button, Alert, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Port from "./port"
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
    imgId : ""
  };

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
        this.handleUpload(response)
      }
    });
  };

  handleUpload = async (response) => {
    await RNFetchBlob.config({
      fileCache: true,
    }).fetch('POST', `${Port}/users/add-user`, {
      'Content-Type': 'multipart/form-data',
      // }, [{ name: 'photo', filename: response.fileName, data: response.data }]).
    }, [{ name: 'photo', filename: response.fileName, data: RNFetchBlob.wrap(response.path) }])
      .then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data, "jsonData");
      })
  };



  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    )
  }
}

