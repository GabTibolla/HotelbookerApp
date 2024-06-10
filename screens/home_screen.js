import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

const HomeScreen = ({ navigation }) => {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen</Text>
            <Button title="Logout" onPress={() => {
                Toast.show({
                    type: 'Mensagem',
                    text1: 'descrição',
                    text2: "maiscoisas"
                });
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomeScreen;
