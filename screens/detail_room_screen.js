import React, {useCallback, useEffect, useState} from 'react';
import { useToken } from '../utils/token_context';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getBaseURL } from "../utils/url_config";
import {useFocusEffect} from "@react-navigation/native";

function DetailRoomScreen({ route, navigation }) {
    const { idHotel, idQuarto } = route.params;

    const [quarto, setQuarto] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useToken();

    const url = getBaseURL();
    useFocusEffect(
        useCallback(() => {
            const fetchRooms = async () => {
                try {
                    const response = await fetch(`${url}/hotels/${idHotel}/rooms/${idQuarto}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setQuarto(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                    setLoading(false);
                }
            };

            fetchRooms();
        }, [url, token, navigation])
    );

    const handleEditHotel = () => {
        navigation.navigate('Editar Quarto', { idHotel, idQuarto });
    };

    const handleDeleteHotel = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este quarto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => confirmDeleteRoom() }
            ]
        );
    };

    const confirmDeleteRoom = () => {
        fetch(`${url}/hotels/${idHotel}/rooms/${idQuarto}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    Alert.alert('Sucesso', 'Hotel excluído com sucesso');
                    navigation.goBack();
                } else {
                    Alert.alert('Erro', 'Não foi possível excluir o hotel');
                }
            })
            .catch(error => {
                console.error('Erro ao excluir o hotel:', error);
                Alert.alert('Erro', 'Não foi possível excluir o hotel');
            });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: quarto.image }} style={styles.cardImage} />
                <Text style={styles.title}>{quarto.name}</Text>
                <Text style={styles.detailText}>Tipo: {quarto.type}</Text>
                <Text style={styles.detailText}>Valor (Diária): R$ {quarto.dailyPrice}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleEditHotel} style={styles.iconButton}>
                    <Icon name="edit" size={30} color="#000" />
                    <Text style={styles.iconText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteHotel} style={styles.iconButton}>
                    <Icon name="trash" size={30} color="#000" />
                    <Text style={styles.iconText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    iconButton: {
        alignItems: 'center',
    },
    iconText: {
        marginTop: 5,
        fontSize: 14,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DetailRoomScreen;
