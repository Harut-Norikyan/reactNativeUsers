import React, { Component } from "react"
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        psw: '',
        pswrepeat: '',
        phone: "",
        status: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        phoneError: '',
        pswError: '',
        pswRepeatError: '',
        nameValidation: new RegExp(/^[A-Za-z\s]{2,20}$/m),
        emailValidaation: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        phoneValidation: new RegExp(/\+?[0-9]{7,20}/),
        passwordValidation: new RegExp(/(?=.*\d)(?=.*[a-z]).{5,}$/),
        repeatPsw: '',
        errors: {}
    };

    async componentDidMount() {
        if (this.props.route.params) {
            await axios.get(`http://a0e8115bb31f.ngrok.io/users/user/${this.props.route.params}`)
                .then(res => this.setState({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email,
                    phone: res.data.user.phone,
                }));
        };
        console.log(this.props.route.params);
    };

    handleSubmitOrUpdate = async () => {
        const {
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

        await this.setState({
            firstNameError: nameValidation.test(firstName),
            lastNameError: nameValidation.test(lastName),
            emailError: emailValidaation.test(email),
            phoneError: phoneValidation.test(phone),
            pswError: passwordValidation.test(psw),
            pswRepeatError: passwordValidation.test(pswrepeat)
        })

        if (firstNameError && lastNameError && emailError && phoneError && pswError && pswRepeatError) {
            if (psw === pswrepeat) {
                if (this.props.route.name === "SignUp") {
                    this.handleSignUp();
                };
            } else this.setState({ repeatPsw: false })
        };
        console.log("---0");
        console.log(pswRepeatError,"pswRepeatError");
        if (firstNameError && lastNameError && emailError && phoneError) {
        console.log("---1");

            if (psw === pswrepeat) {     
        console.log("---02");

                if (this.props.route.name === "Update") {
                    console.log("update func");
                    this.handleUpdate();
                };
            } else this.setState({ repeatPsw: false })
        };


    };

    handleSignUp = async () => {
        let { firstName, lastName, email, psw, phone } = this.state;
        await axios.post(`http://a0e8115bb31f.ngrok.io/users/add-user`, { firstName, lastName, email, psw, phone })
            .then(res => {
                this.setState({
                    status: res.data.status,
                    errors: res.data.errors ? res.data.errors : null
                });
            });
    };

    handleUpdate = async () => {
        let { firstName, lastName, email, psw, phone } = this.state;
        await axios.post(`http://a0e8115bb31f.ngrok.io/users/update/${this.props.route.params}`, { firstName, lastName, email, psw, phone })
            .then(res => {
                this.setState({
                    status: res.data.status
                });
            });
    };

    render() {

        let { firstNameError, lastNameError, emailError, phoneError, pswError, pswRepeatError, repeatPsw, errors } = this.state;

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
                    <View style={styles.errorBlock}>{errors ? Object.values(errors).map((m, index) => <Text key={index} style={styles.errorText}>{m}</Text>) : null}</View>

                    <TextInput
                        value={this.state.firstName}
                        type="text"
                        style={styles.inputs}
                        placeholder="First Name!"
                        onChangeText={(text) => this.setState({ firstName: text })}
                        required
                    />
                    <View style={styles.errorBlock}>{firstNameError === false ? <Text style={styles.errorText}>First name is not valid!</Text> : null}</View>
                    <TextInput
                        value={this.state.lastName}
                        type="text"
                        style={styles.inputs}
                        placeholder="Last Name!"
                        onChangeText={(text) => this.setState({ lastName: text })}
                        required
                    />
                    <View style={styles.errorBlock}>{lastNameError === false ? <Text style={styles.errorText}>Last name is not valid!</Text> : null}</View>
                    <TextInput
                        value={this.state.email}
                        keyboardType="email-address"
                        style={styles.inputs}
                        placeholder="Email!"
                        onChangeText={(text) => this.setState({ email: text })}
                        required
                    />
                    <View style={styles.errorBlock}>{emailError === false ? <Text style={styles.errorText}>Email is not valid!</Text> : null}</View>
                    <TextInput
                        value={this.state.phone}
                        keyboardType='numeric'
                        style={styles.inputs}
                        placeholder="Phone!"
                        onChangeText={(text) => this.setState({ phone: text })}
                        required
                    />
                    <View style={styles.errorBlock}>{phoneError === false ? <Text style={styles.errorText}>Phone number is not valid!</Text> : null}</View>
                    <TextInput
                        type="password"
                        style={styles.inputs}
                        placeholder="Password!"
                        onChangeText={(text) => this.setState({ psw: text })}
                        secureTextEntry={true}
                        required
                    />
                    <View style={styles.errorBlock}>{pswError === false && !this.props.route.params ? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
                    <TextInput
                        type="password"
                        style={styles.inputs}
                        placeholder="Repeat Password!"
                        onChangeText={(text) => this.setState({ pswrepeat: text })}
                        secureTextEntry={true}
                        required
                    />
                    <View style={styles.errorBlock}>{pswRepeatError === false && !this.props.route.params? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
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




