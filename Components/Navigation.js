
import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Navigation = ({ navigation }) => {

    async function logOut() {
        await AsyncStorage.removeItem("token")
    }


    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.touchableHighlight}
            >
                <Text style={styles.text}>
                    Go To Login
          </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.touchableHighlight}
            >
                <Text style={styles.text}>
                    Go To SignUp
          </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Users')}
                style={styles.touchableHighlight}
            >
                <Text style={styles.text}>
                    Go To Users
        </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchableHighlight}
                onPress={logOut}
            >
                <Text style={styles.text}>
                    Log Out
          </Text>
            </TouchableOpacity>
        </View>
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
        backgroundColor: "red",
        color: "#fff",
        fontSize: 15,
        textTransform: "uppercase",
        width: 150,
        textAlign: "center"
    },
});
export default Navigation;