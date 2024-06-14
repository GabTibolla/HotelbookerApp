import React, {useEffect, useState} from 'react';
import {useToken} from '../utils/token_context';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';

function QuartosScreen({ route, navigation }) {
    const { idHotel } = route.params;

    const [quartos, setQuartos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useToken();


    useEffect(() => {
        fetch( `http://192.168.100.7:8080/hotels/${idHotel}/rooms`,
            {headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => response.json())
            .then(data => {
                setQuartos(data.result);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
                setLoading(false);
            });
    }, []);

    const handleNavigateToDetail = (idQuarto) => {
        navigation.navigate('Fazer Reserva', { idHotel, idQuarto });
    };


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {quartos.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleNavigateToDetail(item.id)}>
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardText}>{item.name}</Text>
                            <Text style={styles.cardText}>Diária: R$ {item.dailyPrice},00</Text>
                            <Text style={styles.cardText}>Tipo: {item.type}</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuartosScreen;
