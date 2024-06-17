import React, {useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

function MyHotelsScreen() {
    const navigation = useNavigation();

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

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const reservas = [
        {
            hotel: 'João Silva',
            quarto: "104",
            checkin: '2024-06-15',
            checkout: '2024-06-20',
            imagem: 'https://imagens-revista.vivadecora.com.br/uploads/2019/05/decora%C3%A7%C3%A3o-quarto-de-hotel-neutro-com-revestimento-em-madeira-escura.jpg',
            endereco: 'Rua Exemplo, 123',
            telefone: '(11) 1234-5678',
            email: 'joao@exemplo.com',
        },
        {
            hotel: 'Maria Santos',
            quarto: "201",
            checkin: '2024-06-21',
            checkout: '2024-06-25',
            imagem: 'https://www.zapimoveis.com.br/blog/wp-content/uploads/2014/09/decoracao-de-quarto-de-hotel-topo.jpg',
            endereco: 'Avenida Teste, 456',
            telefone: '(21) 8765-4321',
            email: 'maria@exemplo.com',
        },
        // Adicione mais dados conforme necessário
    ];

    const handleNavigateCreateHotel = () => {
        navigation.navigate("Criar Hotel", {});
    }

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
                            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardText}>Hotel {item.hotel}</Text>
                                <Text style={styles.cardText}>Quarto: {item.quarto}</Text>
                                <Text style={styles.cardText}>Check-in: {item.checkin}</Text>
                                <Text style={styles.cardText}>Check-out: {item.checkout}</Text>
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
