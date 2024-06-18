import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getBaseURL } from '../utils/url_config';
import { useToken, useId } from '../utils/token_context';

function CreateHotelScreen({ route, navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');
    const { token } = useToken();
    const { id } = useId();
    const { onCreate } = route.params;

    const handleSignUp = async () => {
        try {
            const url = getBaseURL();
            const response = await fetch(`${url}/hotels/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    address,
                    telephone,
                    email,
                    state,
                    country,
                    image,
                }),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
                if (onCreate) onCreate();
                navigation.goBack();
            } else {
                Alert.alert('Erro', 'Falha no cadastro. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cadastro de Hotel</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Endereço"
                placeholderTextColor="#aaa"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#aaa"
                value={telephone}
                onChangeText={setTelephone}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Estado"
                placeholderTextColor="#aaa"
                value={state}
                onChangeText={setState}
            />
            <TextInput
                style={styles.input}
                placeholder="País"
                placeholderTextColor="#aaa"
                value={country}
                onChangeText={setCountry}
            />
            <TextInput
                style={styles.input}
                placeholder="Imagem (URL)"
                placeholderTextColor="#aaa"
                value={image}
                onChangeText={setImage}
            />
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Cadastrar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 24,
        paddingTop: 24,
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
});

export default CreateHotelScreen;
