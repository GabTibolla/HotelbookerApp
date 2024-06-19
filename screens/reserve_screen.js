import React, {useCallback, useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getBaseURL} from "../utils/url_config";
import {useToken, useId} from "../utils/token_context";

function ReserveScreen() {
    const navigation = useNavigation();
    const [reservas, setReservas] = useState([]);

    // const reservas = [
    //     {
    //         hotel: 'João Silva',
    //         quarto: "104",
    //         checkin: '2024-06-15',
    //         checkout: '2024-06-20',
    //         imagem: 'https://imagens-revista.vivadecora.com.br/uploads/2019/05/decora%C3%A7%C3%A3o-quarto-de-hotel-neutro-com-revestimento-em-madeira-escura.jpg',
    //         endereco: 'Rua Exemplo, 123',
    //         telefone: '(11) 1234-5678',
    //         email: 'joao@exemplo.com',
    //     },
    //     {
    //         hotel: 'Maria Santos',
    //         quarto: "201",
    //         checkin: '2024-06-21',
    //         checkout: '2024-06-25',
    //         imagem: 'https://www.zapimoveis.com.br/blog/wp-content/uploads/2014/09/decoracao-de-quarto-de-hotel-topo.jpg',
    //         endereco: 'Avenida Teste, 456',
    //         telefone: '(21) 8765-4321',
    //         email: 'maria@exemplo.com',
    //     },
    //     // Adicione mais dados conforme necessário
    // ];

    const url = getBaseURL();
    const { token } = useToken();
    const {id} = useId();

    useFocusEffect(
        useCallback(() => {
            const fetchHotels = async () => {
                try {
                    const response = await fetch(`${url}/reserve/userId/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data);

                    setReservas(data.result);
                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                }
            };

            fetchHotels();
        }, [url, token, navigation])
    );


    const handleNavigateToDetail = (reserva) => {
        navigation.navigate('Detalhes', { reserva });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reservas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.room.image }} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>{item.hotel.name}</Text>
                                <Text style={styles.cardText}>Quarto: {item.room.name}</Text>
                                <Text style={styles.cardText}>Check-in: {item.checkInDate}</Text>
                                <Text style={styles.cardText}>Check-out: {item.checkOutDate}</Text>
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
        width: 50,
        height: 50,
        borderRadius: 25,
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

export default ReserveScreen;
