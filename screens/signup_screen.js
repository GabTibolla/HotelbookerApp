import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import {getBaseURL} from "../utils/url_config";

function SignUpScreen({ navigation }) {
    const [role, setRole] = useState('User');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        const userData = {
            role,
            login,
            password,
        };

        try {
            const url = getBaseURL();
            const response = await fetch(`${url}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro', 'Falha no cadastro. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário</Text>
            <RadioButtonGroup
                containerStyle={styles.radioGroup}
                selected={role}
                onSelected={(value) => setRole(value)}
                radioBackground="blue"
            >
                <RadioButtonItem style={styles.rbtnItem} value="USER" label="Usuário" />
                <RadioButtonItem style={styles.rbtnItem} value="ADMIN" label="Dono de Hotel" />
            </RadioButtonGroup>
            <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#aaa"
                value={login}
                onChangeText={setLogin}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
        textAlign: 'center',
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    input: {
        height: 48,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 16,
        paddingHorizontal: 16,
        borderRadius: 24,
        fontSize: 16,
        color: '#333',
    },
    signUpButton: {
        width: '100%',
        backgroundColor: '#3f51b5',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 24,
    },
    signUpButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    rbtnItem: {
        marginLeft: 16,
    },
});

export default SignUpScreen;
