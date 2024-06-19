import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getBaseURL } from '../utils/url_config';
import { useToken, useId } from '../utils/token_context';

const screenWidth = Dimensions.get('window').width;

// Dicionário de meses
const monthNames = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
};

const HomeAdmScreen = ({ navigation }) => {
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [monthsReservesData, setMonthsReservesData] = useState([]);

    useEffect(() => {
        const headerRight = () => (
            <MaterialCommunityIcons
                name="logout"
                size={25}
                onPress={handleLogout}
                style={{ marginRight: 15 }}
            />
        );

        navigation.setOptions({
            headerRight,
        });
    }, [navigation]);

    const url = getBaseURL();
    const { token } = useToken();
    const { id } = useId();

    useFocusEffect(
        useCallback(() => {
            const fetchStatistics = async () => {
                try {
                    const response = await fetch(`${url}/statistics/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setStatistics(data);
                    setLoading(false);

                    if (data.monthsReserves) {
                        const monthsData = data.monthsReserves.map(month => {
                            const monthNumber = Object.keys(month)[0];
                            const reservations = month[monthNumber];
                            return {
                                month: monthNames[parseInt(monthNumber)], // Converter número de mês para nome completo
                                reservations: reservations
                            };
                        });
                        setMonthsReservesData(monthsData);
                    }
                } catch (error) {
                    setLoading(false);
                    console.error('Erro ao buscar os dados:', error);
                }
            };

            fetchStatistics();
        }, [url, id, token, navigation])
    );

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!loading && Object.keys(statistics).length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Estatísticas dos hotéis</Text>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text>Total de Hotéis: {statistics.totalHotels ?? 'Dados não disponíveis'}</Text>
                    <Text>Total de Quartos: {statistics.totalRooms ?? 'Dados não disponíveis'}</Text>
                    <Text>Total de Reservas: {statistics.totalReservations ?? 'Dados não disponíveis'}</Text>
                    <Text>Receita Total: {statistics.totalRevenue ? statistics.totalRevenue.toFixed(2) : 'Dados não disponíveis'}</Text>
                </View>

                {/* Exemplo de gráfico de barras */}
                <BarChart
                    data={{
                        labels: ['Hotéis', 'Quartos', 'Reservas'],
                        datasets: [
                            {
                                data: [statistics.totalHotels ?? 0, statistics.totalRooms ?? 0, statistics.totalReservations ?? 0]
                            }
                        ]
                    }}
                    width={screenWidth - 40}
                    height={220}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726'
                        }
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />

                {/* Exemplo de gráfico de linha */}
                {monthsReservesData.length > 0 && (
                    <LineChart
                        data={{
                            labels: monthsReservesData.map(monthData => monthData.month), // Array de meses como nomes completos
                            datasets: [
                                {
                                    data: monthsReservesData.map(monthData => monthData.reservations) // Array de reservas
                                }
                            ]
                        }}
                        width={screenWidth - 40}
                        height={220}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#ffa726'
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                )}

                {/* Exemplo de gráfico de pizza */}
                <PieChart
                    data={[
                        {
                            name: statistics.totalHotels == 1 ? "Hotel" : 'Hotéis',
                            population: statistics.totalHotels ?? 0,
                            color: '#ff6384',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15
                        },
                        {
                            name: statistics.totalRooms == 1 ? "Quarto" : 'Quartos',
                            population: statistics.totalRooms ?? 0,
                            color: '#36a2eb',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15
                        },
                        {
                            name: statistics.totalReservations == 1 ? "Reserva" :  'Reservas',
                            population: statistics.totalReservations ?? 0,
                            color: '#ffcd56',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15
                        }
                    ]}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeAdmScreen;
