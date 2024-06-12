import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReserveScreen from '../screens/reserve_screen';
import DetailScreen from './detail_reserve_screen';

const Stack = createStackNavigator();

function ReserveStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Minhas Reservas" component={ReserveScreen} />
            <Stack.Screen name="Detalhes" component={DetailScreen} />
        </Stack.Navigator>
    );
}

export default ReserveStack;
