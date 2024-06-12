import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HotelScreen() {
    const navigation = useNavigation();

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
        // Adicione mais dados conforme necessário
    ];

    const handleNavigateToDetail = (hotel) => {
        navigation.navigate('Quartos', { hotel });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={hotels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>Hotel {item.name}</Text>
                                <Text style={styles.cardText}>Quarto: {item.email}</Text>
                                <Text style={styles.cardText}>Check-in: {item.address}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
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
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardImage: {
        width: 120, // aumente o tamanho da imagem
        height: 120, // aumente o tamanho da imagem
        borderRadius: 10, // ajuste o raio do border radius para se adequar ao novo tamanho da imagem
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});

export default HotelScreen;
