import React, { Component } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Users from "./Components/Users";
import Navigation from "./Components/Navigation";


const Stack = createStackNavigator();

class App extends Component {


  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Navigation} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Update" component={SignUp} />
          <Stack.Screen name="Users" component={Users} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


export default App;





