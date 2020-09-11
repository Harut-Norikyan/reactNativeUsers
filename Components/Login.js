import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {

    state = {
        email: '',
        psw: '',
        token: '',
        wrongData: '',
        pswError: '',
        emailError: '',
        emailValidaation: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        passwordValidation: new RegExp(/(?=.*\d)(?=.*[a-z]).{5,}$/),
    };

    handleSubmit = async () => {
        let { email, psw, pswError, emailError, emailValidaation, passwordValidation } = this.state;
        await this.setState({
            emailError: emailValidaation.test(email),
            pswError: passwordValidation.test(psw),
        })
        if (pswError && emailError) {
            await axios.post(`http://a0e8115bb31f.ngrok.io/users/login`, { email, psw })
                .then(res => {
                    if (res.data.token) {
                        this.setState({
                            token: AsyncStorage.setItem("token", res.data.token)
                        });
                        // this.props.navigation.navigate("Users");
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })

                    } else { this.setState({ wrongData: res.data.status }) }
                });
        }
    };

    render() {
        const { wrongData, pswError, emailError } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.errorBlock}>{wrongData ? <Text style={styles.errorText}>{wrongData}</Text> : null}</View>
                <TextInput
                    keyboardType="email-address"
                    style={styles.inputs}
                    placeholder="Email !"
                    onChangeText={(text) => this.setState({ email: text })}
                    required
                />
                <View style={styles.errorBlock}>{emailError === false ? <Text style={styles.errorText}>Email is not valid!</Text> : null}</View>
                <TextInput
                    type="password"
                    secureTextEntry={true}
                    style={styles.inputs}
                    placeholder="Password !"
                    onChangeText={(text) => this.setState({ psw: text })}
                    required
                />
                <View style={styles.errorBlock}>{pswError === false ? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
                <View style={styles.signUpBlock}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleSubmit()}>
                        <Text style={[styles.text, { backgroundColor: "green" }]}>
                            Login
                                </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
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
        margin: 10
    },
    signUpBlock: {
        justifyContent: "center",
        flexDirection: 'row',
    },
    errorBlock: {
        marginLeft: "10%",
        height: 20
    },
    errorText: {
        color: "red",
    },
})

export default Login;