import React from 'react';
import {View, Text, StyleSheet, Button, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useToken} from "../utils/token_context";
import {getBaseURL} from "../utils/url_config";

function DetailScreen({ route, navigation }) {
    const { reserva } = route.params;

    const {token}=useToken();
    const url = getBaseURL();

    const handleEditReserve = () => {
        navigation.navigate('Editar Reserva', { reserva });
    };

    const handleDeleteReserve = () => {
        Alert.alert(
            'Confirmar Cancelamento',
            'Tem certeza que deseja cancelar essa reserva?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => confirmDeleteReserve() }
            ]
        );
    };

    const confirmDeleteReserve = () => {
        fetch(`${url}/hotels/${reserva.hotel.id}/rooms/${reserva.room.id}/reserve/${reserva.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                if (response.ok) {
                    Alert.alert('Sucesso', 'Reserva cancelada com sucesso');
                    navigation.goBack();
                } else {
                    Alert.alert('Erro', 'Não foi possível cancelar a reserva');
                }
            })
            .catch(error => {
                console.error('Erro ao cancelar a reserva:', error);
                Alert.alert('Erro', 'Não foi possível cancelar a reserva');
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: reserva.room.image }} style={styles.cardImage} />
                <Text style={styles.title}>{reserva.hotel.name}</Text>
                <Text style={styles.detailText}>Quarto: {reserva.room.name}</Text>
                <Text style={styles.detailText}>Check-in: {reserva.checkInDate}</Text>
                <Text style={styles.detailText}>Check-out: {reserva.checkOutDate}</Text>
                <Text style={styles.detailText}>Endereço: {reserva.hotel.address}</Text>
                <Text style={styles.detailText}>Telefone: {reserva.hotel.telephone}</Text>
                <Text style={styles.detailText}>Email: {reserva.hotel.email}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleDeleteReserve} style={styles.iconButton}>
                    <Icon name="trash" size={30} color="#000" />
                    <Text style={styles.iconText}>Cancelar</Text>
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
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
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
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    iconButton: {
        alignItems: 'center',
    },
    iconText: {
        marginTop: 5,
        fontSize: 14,
    },
});

export default DetailScreen;
