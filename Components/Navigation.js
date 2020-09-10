import React,{useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Navigation = ({ navigation }) => {

    async function logOut() {
        await AsyncStorage.removeItem("token");
    };

    let token = null;
    async function loginOrUsers() {
        token = await AsyncStorage.getItem("token");
        if (token !== null) {
            navigation.navigate('Users');
        } else navigation.navigate('Login');
    };
    
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

                <TouchableOpacity
                    // onPress={loginOrUsers}
                    style={styles.touchableHighlight}
                >
                    <Text style={styles.text}>Users Page</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchableHighlight}
                    onPress={logOut}
                >
                    <Text style={[styles.text,{backgroundColor : "red"}]}>Log Out</Text>
                </TouchableOpacity>
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