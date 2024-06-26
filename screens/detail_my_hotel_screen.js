import React, {useCallback, useEffect, useState} from 'react';
import { useToken } from '../utils/token_context';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getBaseURL } from "../utils/url_config";
import {useFocusEffect} from "@react-navigation/native";

function DetailMyHotelScreen({ route, navigation }) {
    const { idHotel } = route.params;

    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const { token } = useToken();

    const url = getBaseURL();
    useFocusEffect(
        useCallback(() => {
            const fetchHotels = async () => {
                try {
                    const response = await fetch(`${url}/hotels/${idHotel}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setHotel(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                    setLoading(false);
                }
            };

            fetchHotels();
        }, [url, token, navigation])
    );



    const handleEditHotel = () => {
        navigation.navigate('Editar Hotel', { idHotel });
    };

    const handleManageRooms = () => {
        navigation.navigate('Gerenciar Quartos', { idHotel });
    };

    const handleDeleteHotel = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este hotel?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => confirmDeleteHotel() }
            ]
        );
    };

    const confirmDeleteHotel = () => {
        fetch(`${url}/hotels/${idHotel}`, {
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
                <Image source={{ uri: hotel.image }} style={styles.cardImage} />
                <Text style={styles.title}>{hotel.name}</Text>
                <Text style={styles.detailText}>Endereço: {hotel.address}</Text>
                <Text style={styles.detailText}>Telefone: {hotel.telephone}</Text>
                <Text style={styles.detailText}>Email: {hotel.email}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleEditHotel} style={styles.iconButton}>
                    <Icon name="edit" size={30} color="#000" />
                    <Text style={styles.iconText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleManageRooms} style={styles.iconButton}>
                    <MaterialIcons name="room-preferences" size={30} color="#000" />
                    <Text style={styles.iconText}>Gerenciar Quartos</Text>
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

export default DetailMyHotelScreen;
