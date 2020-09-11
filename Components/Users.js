import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';

class Users extends Component {

    state = {
        data: [],
        status: '',
    };

    async componentDidMount() {
        await axios.get(`http://a0e8115bb31f.ngrok.io/users/get-users`)
            .then(res => {
                this.setState({
                    data: res.data,
                });
            });
    };

    handleDelete = async (id) => {
        let { data } = this.state
        await axios.delete(`http://a0e8115bb31f.ngrok.io/users/delete/${id}`)
            .then(res => {
                if (res.data.status === "success") {
                    const newState = this.state;
                    const index = newState.data.findIndex(a => a._id === id);
                    if (index === -1) return;
                    newState.data.splice(index, 1);
                    this.setState(data);
                };

            });
    };

    render() {
        let { data } = this.state;
        return (
            <>
                <ScrollView>
                    {data ? data.map((m, index) =>
                        <View key={index}>
                            <View key={m.id} style={styles.container}>
                                <Text><Text style={styles.bold}>First Name</Text> : {m.firstName}</Text>
                                <Text><Text style={styles.bold}>Last Name</Text> : {m.lastName}</Text>
                                <Text><Text style={styles.bold}>Email</Text> : {m.email}</Text>
                                <Text><Text style={styles.bold}>Phone</Text> : {m.phone}</Text>

                                <View style={styles.updateBlock}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate(`Update`, m._id)}
                                    >
                                        <Text style={styles.text}>
                                            Update
                                </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => this.handleDelete(m._id)}
                                    >
                                        <Text style={[styles.text, { backgroundColor: "red" }]}>
                                            Delete
                                </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    ) : null}
                </ScrollView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "80%",
        borderWidth: 2,
        padding: 10,
        margin: 5,
    },
    bold: {
        fontWeight: "bold"
    },
    text: {
        borderRadius: 3,
        padding: 6,
        marginTop: 5,
        borderColor: 'black',
        color: "#fff",
        fontSize: 12,
        textTransform: "uppercase",
        width: 80,
        textAlign: "center",
        backgroundColor: "blue",
        marginRight:20
    },
    updateBlock: {
        flexDirection: 'row',
    },
})
export default Users;