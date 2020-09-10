import React, { Component } from "react"
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";

// ^\w+([\.-]?\w+)*(@)\w+.(\w{2,5})$  --email regexp

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




    };

    async componentDidMount() {
        if (this.props.route.params) {
            await axios.get(`http://5d06956cf78e.ngrok.io/users/user/${this.props.route.params}`)
                .then(res => this.setState({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email,
                    phone: res.data.user.phone,
                }));
        };
    };

    handleSubmitOrUpdate = () => {
        if (this.props.route.name === "SignUp") {
            this.handleSignUp();
        };
        if (this.props.route.name === "Update") {
            this.handleUpdate();
        };
    };

    handleSignUp = async () => {
        let { firstName, lastName, email, psw, pswrepeat, phone } = this.state;
        // await axios.post(`http://5d06956cf78e.ngrok.io/users/add-user`, { firstName, lastName, email, psw, phone })
        //     .then(res => {
        //         console.log(res, "res");
        //         this.setState({
        //             status: res.data.status
        //         });
        //     });

        const nameValidation = new RegExp(/^[A-Za-z\s]{2,20}$/m)
        const emailValidaation = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const phoneValidation = new RegExp(/\+?[0-9]{7,20}/);
        const passwordValidation = new RegExp(/(?=.*\d)(?=.*[a-z]).{5,}$/);

        await this.setState({
            firstNameError: nameValidation.test(firstName),
            lastNameError: nameValidation.test(lastName),
            emailError: emailValidaation.test(email),
            phoneError: phoneValidation.test(phone),
            pswError: passwordValidation.test(psw),
            pswRepeatError: passwordValidation.test(pswrepeat)
        })
    };

    handleUpdate = async () => {
        let { firstName, lastName, email, psw, phone } = this.state;
        await axios.post(`http://5d06956cf78e.ngrok.io/users/update/${this.props.route.params}`, { firstName, lastName, email, psw, phone })
            .then(res => {
                this.setState({
                    status: res.data.status
                });
            });
    };

    render() {

        let { firstNameError, lastNameError, emailError, phoneError, pswError, pswRepeatError } = this.state

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
                    <View style={styles.errorBlock}>{pswError === false ? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
                    <TextInput
                        type="password"
                        style={styles.inputs}
                        placeholder="Repeat Password!"
                        onChangeText={(text) => this.setState({ pswrepeat: text })}
                        secureTextEntry={true}
                        required
                    />
                    <View style={styles.errorBlock}>{pswRepeatError === false ? <Text style={styles.errorText}>Password is not valid!</Text> : null}</View>
                    <View style={styles.signUpBlock}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Home")}
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




