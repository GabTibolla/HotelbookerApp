import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getBaseURL } from '../utils/url_config';
import { useToken, useId } from '../utils/token_context';

function CreateRoomScreen({ route, navigation }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [dailyPrice, setDailyPrice] = useState(null);
    const [image, setImage] = useState('');

    const { token } = useToken();
    const { onCreate, idHotel } = route.params;

    const handleCreateRoom = async () => {
        try {
            const url = getBaseURL();
            console.log(`${url}/hotels/${idHotel}/rooms`);
            const response = await fetch(`${url}/hotels/${idHotel}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    type,
                    dailyPrice,
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
            <Text style={styles.title}>Cadastro de Quarto</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo"
                placeholderTextColor="#aaa"
                value={type}
                onChangeText={setType}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor Diária"
                placeholderTextColor="#aaa"
                value={dailyPrice}
                onChangeText={setDailyPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Imagem (URL)"
                placeholderTextColor="#aaa"
                value={image}
                onChangeText={setImage}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
                <Text style={styles.createButtonText}>Cadastrar</Text>
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
    createButton: {
        width: '100%',
        backgroundColor: '#3f51b5',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 24,
    },
    createButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default CreateRoomScreen;
