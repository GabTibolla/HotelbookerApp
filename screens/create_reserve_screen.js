import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToken, useId} from '../utils/token_context';
import {getBaseURL} from "../utils/url_config";

function CreateReserveScreen({ route, navigation }) {
    const { idHotel, idQuarto } = route.params;

    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
    const { token } = useToken();
    const {id} = useId();

    const handleReserve = () => {
        const data = {
            name,
            telephone,
            email,
            checkInDate: checkInDate.toISOString().split('T')[0],
            checkOutDate: checkOutDate.toISOString().split('T')[0],
        };

        if (data.checkOutDate === data.checkInDate) {
            Alert.alert('As datas devem ser pelo menos 1 dia diferentes');
            return;
        }

        const url = getBaseURL();
        fetch(`${url}/hotels/${idHotel}/rooms/${idQuarto}/reserve/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao realizar a requisição.');
                }
                return response.json();
            })
            .then(result => {
                const { hotel, room, checkInDate, checkOutDate } = result;

                // Exibir mensagem
                Alert.alert(
                    "Reserva Confirmada",
                    `Você reservou o quarto "${room.name}" no hotel "${hotel.name}".\n\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}`,
                    [
                        { text: 'OK', onPress: () => navigation.goBack() }
                    ]
                );
            })
            .catch(error => {
                Alert.alert('Erro ao fazer a reserva. Tente novamente.', error.toString());
            });
    };

    const showCheckInDatePicker = () => {
        setShowCheckInPicker(true);
    };

    const showCheckOutDatePicker = () => {
        setShowCheckOutPicker(true);
    };

    const onCheckInDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || checkInDate;
        setShowCheckInPicker(Platform.OS === 'ios');
        setCheckInDate(currentDate);
    };

    const onCheckOutDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || checkOutDate;
        setShowCheckOutPicker(Platform.OS === 'ios');
        setCheckOutDate(currentDate);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o seu nome"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o seu telefone"
                    value={telephone}
                    onChangeText={setTelephone}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira o seu email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Check-In</Text>
                <View style={styles.dateInputContainer}>
                    <Text style={styles.datePickerText}>{formatDate(checkInDate)}</Text>
                    <TouchableOpacity onPress={showCheckInDatePicker}>
                        <MaterialCommunityIcons name="calendar-edit" color="#666" size={24}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Check-Out</Text>
                <View style={styles.dateInputContainer}>
                    <Text style={styles.datePickerText}>{formatDate(checkOutDate)}</Text>
                    <TouchableOpacity onPress={showCheckOutDatePicker}>
                        <MaterialCommunityIcons name="calendar-edit" color="#666" size={24}/>
                    </TouchableOpacity>
                </View>
            </View>

            <Button title="Reservar" onPress={handleReserve} />

            {showCheckInPicker && (
                <DateTimePicker
                    value={checkInDate}
                    mode="date"
                    display="default"
                    onChange={onCheckInDateChange}
                />
            )}
            {showCheckOutPicker && (
                <DateTimePicker
                    value={checkOutDate}
                    mode="date"
                    display="default"
                    onChange={onCheckOutDateChange}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 16,
        elevation: 3,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 3,
    },
    datePickerButton: {
        padding: 10,
    },
    datePickerText: {
        color: '#333',
        fontSize: 16,
    },
});

export default CreateReserveScreen;
