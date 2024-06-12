import React from 'react';
import {View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity} from 'react-native';

function DetailHotelScreen({ route, navigation }) {
    const { hotel } = route.params;

    const handleCancelReservation = () => {
        alert('Reserva cancelada');
        navigation.goBack();
    };

    const hotels = [
        {
            name: 'João Silva',
            email: "104",
            address: '2024-06-15',
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg?w=1200&h=-1&s=1',
            country: "BR",
            state: "RS",
            created_at: "2022-06-15"
        },
        {
            name: 'Maria Santos',
            email: "201",
            address: '2024-06-21',
            image: 'https://www.cnnbrasil.com.br/viagemegastronomia/wp-content/uploads/sites/5/2021/05/colline-de-france.jpeg?w=1200&h=674&crop=1',
            country: "BR",
            state: "RS",
            created_at: "2022-06-15"
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: hotel.image }} style={styles.cardImage} />
                <Text style={styles.title}>Detalhes do hotel</Text>
                <Text style={styles.detailText}>Hotel: {hotel.name}</Text>
                <Text style={styles.detailText}>Quarto: {hotel.address}</Text>
                <Text style={styles.detailText}>Check-in: {hotel.email}</Text>
            </View>

            {hotels.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleNavigateToDetail(item)}>
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardText}>Hotel {item.name}</Text>
                            <Text style={styles.cardText}>Quarto: {item.email}</Text>
                            <Text style={styles.cardText}>Check-in: {item.address}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
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
        color: '#333',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default DetailHotelScreen;
