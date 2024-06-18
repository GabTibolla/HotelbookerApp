import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToken, useId } from "../utils/token_context";
import {getBaseURL} from "../utils/url_config";

function MyHotelsScreen() {
    const navigation = useNavigation();
    const { token } = useToken();
    const { id } = useId();
    const url = getBaseURL();
    const [myHotels, setMyHotels] = useState([]);

    useEffect(() => {
        const headerRight = () => (
            <MaterialCommunityIcons
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

    useEffect(() => {
        fetch( `${url}/hotels/userId/${id}`,
            {headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMyHotels(data.result);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

     const handleNavigateCreateHotel = () => {
         navigation.navigate("Criar Hotel", {});
     }

     const handleNavigateToDetail = (idHotel) => {
         navigation.navigate('Detalhes do Hotel', { idHotel });
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
                                <Text style={styles.cardText}>Endereço: {item.address}</Text>
                                <Text style={styles.cardText}>Telefone: {item.telephone}</Text>
                                <Text style={styles.cardText}>E-mail: {item.email}</Text>
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

export default MyHotelsScreen;
