import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HotelScreen from '../screens/hotel_screen';
import DetailHotelScreen from './detail_hotel_screen';

const Stack = createStackNavigator();

function HotelStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hotéis" component={HotelScreen} />
            <Stack.Screen name="Quartos" component={DetailHotelScreen} />
        </Stack.Navigator>
    );
}

export default HotelStack;
