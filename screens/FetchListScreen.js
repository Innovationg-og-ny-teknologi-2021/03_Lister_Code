import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';

// HUSK at importere Image, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard fra react-native

import {GET_USERS_URL } from '../data/const';

export default function FetchListScreen() {

    const [user, setUser] = useState({});
    const [msg, setMsg] = useState("");
    const [amount, setAmount] = useState(2);

    const loadUsers = async () => {
        try {
            const response = await fetch(GET_USERS_URL + amount);
            const json = await response.json();
            setUser(json.results);
        }
        catch (error) {
            setMsg("Error: " + error);
        }
    }

    useEffect(() => {
        loadUsers();
    }, [amount]);


  return (
    user.length > 0 ? (
        <View style={styles.container}>
        <Text style={{ fontSize: 20, textAlign:'center',padding:40 }}>2 3 Brugere i liste: {user.length} - Fetch Object list</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dimiss} accessible = {false}>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, textAlign: 'center', marginBottom: 10}} 
                onChangeText = {setAmount} 
                value = {amount.toString()}
                placeholder={`default antal: 1`}
                keyboardType={"numeric"}
            />
        </TouchableWithoutFeedback>
        <View style={{height: 350 , backgroundColor: 'lightgrey', borderRadius: 10, width: '80%'}}>
                <ScrollView>
                    {
                        user.map((user, index) => {
                            return(
                                <View key={index} style = {{alignItems: "center", padding: 10}}>
                                    <Image
                                        source={{uri: user.picture.medium}}
                                        style={{width: 50, height: 50, borderRadius: 25}}
                                    />
                                    <Text style={{ fontSize: 15, textAlign:'center',padding:10 }}>{user.name.first} {user.name.last}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <Text>{msg ? msg :""}</Text>
            <StatusBar style="auto" />
        </View>
    ) : (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <StatusBar style="auto" />
        </View>

    )
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
