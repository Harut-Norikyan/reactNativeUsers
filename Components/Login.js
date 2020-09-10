import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {

    state = {
        email: '',
        psw: '',
        token: ''
    };

    handleSubmit = async () => {
        let { email, psw } = this.state;
        await axios.post(`http://5d06956cf78e.ngrok.io/users/login`, { email, psw })
            .then(res => {
                if (res.data.token) {
                    this.setState({
                        token: AsyncStorage.setItem("token", res.data.token)
                    });
                    this.props.navigation.navigate("Users");
                };
            });
    };

    render() {
        return (
            <>
                <TextInput
                    style={styles.inputs}
                    placeholder="Email !"
                    onChangeText={(text) => this.setState({ email: text })}
                    required
                />
                <TextInput
                    type="password"
                    secureTextEntry={true}
                    style={styles.inputs}
                    placeholder="Password !"
                    onChangeText={(text) => this.setState({ psw: text })}
                    required
                />
                <View style={styles.signUpBlock}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Home")}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.handleSubmit()}>
                        <Text style={[styles.text, { backgroundColor: "green" }]}>
                            Login
                                </Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    inputs: {
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        height: 40,
        width: "80%",
        marginLeft: "10%",
        paddingLeft: 10,
        borderRadius: 3
    },
    text: {
        borderRadius: 3,
        padding: 6,
        marginTop: 5,
        borderColor: 'black',
        color: "#fff",
        fontSize: 15,
        textTransform: "uppercase",
        width: 100,
        textAlign: "center",
        backgroundColor: "#2196F3",
    },
    signUpBlock: {
        justifyContent: "center",
        flexDirection: 'row',

    },
})

export default Login;