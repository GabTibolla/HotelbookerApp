import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useToken} from '../utils/token_context';
import {getBaseURL} from "../utils/url_config";


function HotelScreen() {
    const navigation = useNavigation();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useToken();

    const url = getBaseURL();

    useEffect(() => {
        fetch( `${url}/hotels`,
            {headers: {
                'Authorization': `Bearer ${token}`,
                }
            })

            .then(response => response.json())
            .then(data => {
                setHotels(data.result);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
                setLoading(false);
            });
    }, []);

    const handleNavigateToDetail = (idHotel) => {
        navigation.navigate('Quartos', { idHotel });
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
            <FlatList
                data={hotels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleNavigateToDetail(item.id)}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>{item.name}</Text>
                                <Text style={styles.cardText}>E-mail: {item.email}</Text>
                                <Text style={styles.cardText}>{item.address}</Text>
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
        width: 120,
        height: 120,
        borderRadius: 10,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HotelScreen;
