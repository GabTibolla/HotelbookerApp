import React, { useState } from 'react';
import { useToken, useRole } from "../utils/token_context";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useToken();
    const { setRole } = useRole();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.100.7:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                setToken(token);
                setRole(data.role);

                navigation.replace('Main');
            } else {
                Alert.alert('Erro', 'Usuário ou senha inválidos');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
        }
    };

    const handleSignUp = () => {
        // Navegar para a tela de cadastro ou outra tela relacionada
        navigation.navigate('SignUp'); // Substitua 'SignUp' pelo nome da sua tela de cadastro
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuário"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
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
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Não tem cadastro? Cadastre-se</Text>
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
    loginButton: {
        width: '100%',
        backgroundColor: '#3f51b5',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 24,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    signUpButton: {
        marginTop: 16,
    },
    signUpButtonText: {
        fontSize: 16,
        color: '#7f8bc8',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
