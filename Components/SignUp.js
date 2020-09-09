import React, { Component } from "react"
import { Button, View, Text, ScrollView, TextInput, Form, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        psw: '',
        pswrepeat: '',
        phone: null,
        status: '',
    }

    handleSubmit = async () => {
        let { firstName, lastName, email, psw, pswrepeat, phone } = this.state;
        await axios.post(`http://386d4cf063b8.ngrok.io/users/add-user`, { firstName, lastName, email, psw, phone })
            .then(res => {
                this.setState({
                    status: res.data.status
                })
            });
    };

    render() {
        if (this.state.status === "done") {
            Alert.alert(
                'Good',
                'User Added',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate("Home")},
                ]
            );
        }
        return (
            <>
                <ScrollView style={styles.container}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="First Name!"
                        onChangeText={(text) => this.setState({ firstName: text })}
                        required
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Last Name!"
                        onChangeText={(text) => this.setState({ lastName: text })}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email!"
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Phone!"
                        onChangeText={(text) => this.setState({ phone: text })}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password!"
                        onChangeText={(text) => this.setState({ psw: text })}
                        secureTextEntry={true}
                    />
                    <TextInput
                        type="password"
                        style={styles.inputs}
                        placeholder="Repeat Password!"
                        onChangeText={(text) => this.setState({ pswrepeat: text })}
                        secureTextEntry={true}
                    />                   
                        <View style={styles.signUpBlock}>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate("Home")}
                            >
                                <Text style={styles.text}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.handleSubmit()}
                            >
                                <Text style={[styles.text, { backgroundColor: "green" }]}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>                   
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: "blue",
    },
    signUpBlock: {
        justifyContent: "center",
        flexDirection: 'row',
    },
})

export default SignUp;



