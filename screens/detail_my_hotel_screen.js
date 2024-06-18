import React, {useEffect, useState} from 'react';
import {useToken} from '../utils/token_context';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Button
} from 'react-native';
import {getBaseURL} from "../utils/url_config";

function DetailMyHotelScreen({ route, navigation }) {
    const { idHotel } = route.params;

    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useToken();

    const url = getBaseURL();
    useEffect(() => {
        fetch( `${url}/hotels/${idHotel}`,
            {headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => response.json())
            .then(data => {
                setHotel(data);
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
    console.log(hotel);
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: hotel.image }} style={styles.cardImage} />
                <Text style={styles.title}>{hotel.name}</Text>
                <Text style={styles.detailText}>Endereço: {hotel.address}</Text>
                <Text style={styles.detailText}>Telefone: {hotel.telephone}</Text>
                <Text style={styles.detailText}>Email: {hotel.email}</Text>
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

export default DetailMyHotelScreen;
