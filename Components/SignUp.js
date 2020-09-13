import React, { Component } from "react"
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Button } from 'react-native';
import axios from "axios";
import Port from "./port"

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        psw: '',
        pswrepeat: '',
        phone: '',
        status: '',
        firstNameError: null,
        lastNameError: null,
        emailError: null,
        phoneError: null,
        pswError: null,
        pswRepeatError: null,
        nameValidation: new RegExp(/^[A-Za-z\s]{2,20}$/m),
        emailValidaation: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        phoneValidation: new RegExp(/\+?[0-9]{7,20}/),
        passwordValidation: new RegExp(/(?=.*\d)(?=.*[a-z]).{5,}$/),
        repeatPsw: '',
        errors: {},
    };

    async componentDidMount() {
        if (this.props.route.params) {
            await axios.get(`${Port}/users/user/${this.props.route.params}`)
                .then(res => this.setState({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email,
                    phone: res.data.user.phone,
                }));
        };
    };

    handleSubmitOrUpdate = async () => {
        let {
            nameValidation,
            emailValidaation,
            phoneValidation,
            passwordValidation,
            psw,
            firstName,
            lastName,
            email,
            phone,
            pswrepeat,
            firstNameError,
            lastNameError,
            emailError,
            phoneError,
            pswError,
            pswRepeatError,
        } = this.state;

        firstNameError = nameValidation.test(firstName);
        lastNameError = nameValidation.test(lastName);
        emailError = emailValidaation.test(email);
        phoneError = phoneValidation.test(phone);
        pswError = passwordValidation.test(psw);
        pswRepeatError = passwordValidation.test(pswrepeat);
        this.setState({firstNameError,lastNameError,emailError,phoneError,pswError,pswRepeatError})

        if (this.props.route.name === "SignUp") {
            if (firstNameError && lastNameError && emailError && phoneError && pswError && pswRepeatError) {
                if (psw === pswrepeat) {
                    this.handleSignUp();
                } else this.setState({ repeatPsw: false })
            };
        };
        if (this.props.route.name === "Update") {
            if (firstNameError && lastNameError && emailError && phoneError) {
                if (psw === pswrepeat) {
                    this.handleUpdate();
                } else this.setState({ repeatPsw: false })
            };
        };
    };

    handleSignUp = async () => {
        let { firstName, lastName, email, psw, phone } = this.state;
        axios.post(`${Port}/users/add-user`, { firstName, lastName, email, psw, phone })
            .then(res => {
                console.log(res, "res");
                this.setState({
                    status: res.data.status,
                    errors: res.data.errors ? res.data.errors : null,
                });
            });
    };

    handleUpdate = async () => {
        let { firstName, lastName, email, psw, phone } = this.state;
        axios.post(`${Port}/users/update/${this.props.route.params}`, { firstName, lastName, email, psw, phone })
            .then(res => {
                this.setState({
                    status: res.data.status,
                    errors: res.data.errors ? res.data.errors : null
                });
            });
    };

    render() {
        let { firstNameError, lastNameError, emailError, phoneError, pswError, pswRepeatError, repeatPsw, errors, photo } = this.state;

        if (this.state.status === "done") {
            Alert.alert(
                'Good',
                'User Added',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate("Home") },
                ]
            );
        };

        if (this.state.status === "user updated") {
            Alert.alert(
                'Good',
                'User updated',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate("Home") },
                ]
            );
        };

        return (
            <>
                <ScrollView style={styles.container}>
                    {errors ? Object.values(errors).map((m, index) => <View style={styles.errorBlock}><Text key={index} style={styles.errorText}>{m}</Text></View>) : null}
                    <TextInput
                        value={this.state.firstName}
                        style={styles.inputs}
                        placeholder="First Name!"
                        onChangeText={(text) => this.setState({ firstName: text })}
                    />
                    <View style={styles.errorBlock}>{firstNameError === false ? <Text style={styles.errorText}>First name is not valid!</Text> : null}</View>
                    <TextInput
                        value={this.state.lastName}
                        style={styles.inputs}
                        placeholder="Last Name!"
                        onChangeText={(text) => this.setState({ lastName: text })}
                    />
                    <View style={styles.errorBlock}>{lastNameError === false ? <Text style={styles.errorText}>Last name is not valid!</Text> : null}</View>
                    <TextInput
                        value={this.state.email}
                        keyboardType="email-address"
                        style={styles.inputs}
                        placeholder="Email!"
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <View style={styles.errorBlock}>{emailError === false ? <Text style={styles.errorText}>Email is not valid!</Text> : null}</View>
                    <TextInput
                        value={this.state.phone}
                        keyboardType='numeric'
                        style={styles.inputs}
                        placeholder="Phone!"
                        onChangeText={(text) => this.setState({ phone: text })}
                    />
                    <View style={styles.errorBlock}>{phoneError === false ? <Text style={styles.errorText}>Phone number is not valid!</Text> : null}</View>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password!"
                        onChangeText={(text) => this.setState({ psw: text })}
                        secureTextEntry={true}
                    />
                    <View style={styles.errorBlock}>{pswError === false && !this.props.route.params ? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Repeat Password!"
                        onChangeText={(text) => this.setState({ pswrepeat: text })}
                        secureTextEntry={true}
                    />
                    <View style={styles.errorBlock}>{pswRepeatError === false && !this.props.route.params ? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
                    <View style={styles.errorBlock}>{repeatPsw === false ? <Text style={styles.errorText}>Password mismatch!</Text> : null}</View>
                    <View style={styles.signUpBlock}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.text}>
                                Cancel
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.handleSubmitOrUpdate()}
                        >
                            <Text style={[styles.text, { backgroundColor: "green" }]}>
                                {this.props.route.name ? this.props.route.name : null}
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
        marginTop: 50,
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

export default SignUp;




