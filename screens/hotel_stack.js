import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HotelScreen from '../screens/hotel_screen';
import QuartoScreen from './room_screen';
import CreateReserveScreen from '../screens/create_reserve_screen';

const Stack = createStackNavigator();

function HotelStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hotéis" component={HotelScreen} />
            <Stack.Screen name="Quartos" component={QuartoScreen} />
            <Stack.Screen name="Fazer Reserva" component={CreateReserveScreen} />
        </Stack.Navigator>
    );
}

export default HotelStack;
