import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

function DetailScreen({ route, navigation }) {
    const { reserva } = route.params;

    const handleCancelReservation = () => {
        alert('Reserva cancelada');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: reserva.imagem }} style={styles.cardImage} />
                <Text style={styles.title}>Detalhes da Reserva</Text>
                <Text style={styles.detailText}>Hotel: {reserva.hotel}</Text>
                <Text style={styles.detailText}>Quarto: {reserva.quarto}</Text>
                <Text style={styles.detailText}>Check-in: {reserva.checkin}</Text>
                <Text style={styles.detailText}>Check-out: {reserva.checkout}</Text>
                <Text style={styles.detailText}>Endereço: {reserva.endereco}</Text>
                <Text style={styles.detailText}>Telefone: {reserva.telefone}</Text>
                <Text style={styles.detailText}>Email: {reserva.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Cancelar Reserva" onPress={handleCancelReservation} color="red" />
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
});

export default DetailScreen;
