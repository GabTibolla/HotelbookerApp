import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateHotelScreen from "./create_hotel_screen";
import MyHotelsScreen from "./my_hotels_screen";
const Stack = createStackNavigator();

function MyHotelsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Meus Hotéis" component={MyHotelsScreen} />
            <Stack.Screen name="Criar Hotel" component={CreateHotelScreen} />
        </Stack.Navigator>
    );
}

export default MyHotelsStack;
