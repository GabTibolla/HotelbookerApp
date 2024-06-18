import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToken, useId } from "../utils/token_context";
import { getBaseURL } from "../utils/url_config";

function RoomManagerScreen({route}) {
    const navigation = useNavigation();
    const { token } = useToken();
    const { id } = useId();
    const url = getBaseURL();
    const [myHotels, setMyHotels] = useState([]);
    const { idHotel } = route.params;

    useEffect(() => {
        const headerRight = () => (
            <Ionicons
                name="add-circle"
                size={25}
                onPress={handleNavigateCreateHotel}
                style={{ marginRight: 15 }}
            />
        );

        navigation.setOptions({
            headerRight,
        });
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            const fetchHotels = async () => {
                try {
                    const response = await fetch(`${url}/hotels/${idHotel}/rooms`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setMyHotels(data.result);
                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                }
            };

            fetchHotels();
        }, [url, id, token, navigation])
    );

    const handleNavigateCreateHotel = () => {
        navigation.navigate("Cadastrar Quarto", {idHotel});
    }


    const handleNavigateToDetail = (idQuarto) => {
       navigation.navigate('Detalhes do Quarto', { idHotel, idQuarto });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={myHotels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleNavigateToDetail(item.id)}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>{item.name}</Text>
                                <Text style={styles.cardText}>Tipo: {item.type}</Text>
                                <Text style={styles.cardText}>Valor (Diária): R$ {item.dailyPrice}</Text>
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

export default RoomManagerScreen;
