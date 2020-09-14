import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Img from "./img"

const Navigation = ({ navigation }) => {

    async function logOut() {
        await AsyncStorage.removeItem("token");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    };



    const [tok, setTok] = useState("");
    let token = null;
    async function getToken() {
        token = await AsyncStorage.getItem("token");
        setTok(token);
    };
    useEffect(() => {
        getToken();
    });


    return (
        <>
        <Img/>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {!tok?
                <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.touchableHighlight}
                    >
                        <Text style={styles.text}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.touchableHighlight}
                    >
                        <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                </>
                :null}

                {tok !== null ?
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Users')}
                            style={styles.touchableHighlight}
                        >
                            <Text style={styles.text}>Users Page</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.touchableHighlight}
                            onPress={logOut}
                        >
                            <Text style={[styles.text, { backgroundColor: "red" }]}>Log Out</Text>
                        </TouchableOpacity></>
                    : null}
            </View>
        </>
    );

}
const styles = StyleSheet.create({
    touchableHighlight: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        borderRadius: 3,
        padding: 10,
        margin: 5,
        borderColor: 'black',
        backgroundColor: "#2196F3",
        color: "#fff",
        fontSize: 15,
        textTransform: "uppercase",
        width: 150,
        textAlign: "center"
    },
});
export default Navigation;