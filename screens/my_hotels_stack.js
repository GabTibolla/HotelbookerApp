import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateHotelScreen from "./create_hotel_screen";
import MyHotelsScreen from "./my_hotels_screen";
import DetailMyHotelScreen from "./detail_my_hotel_screen";
import EditMyHotelScreen from "./edit_my_hotel_screen";
import RoomManagerScreen from "./room_manager_screen";
import CreateRoomScreen from "./create_room_screen";
import EditRoomScreen from "./edit_room_screen";
import DetailRoomScreen from "./detail_room_screen";
const Stack = createStackNavigator();

function MyHotelsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Meus Hotéis" component={MyHotelsScreen} />
            <Stack.Screen name="Cadastrar Hotel" component={CreateHotelScreen} />
            <Stack.Screen name="Detalhes do Hotel" component={DetailMyHotelScreen} />
            <Stack.Screen name="Editar Hotel" component={EditMyHotelScreen} />
            <Stack.Screen name="Gerenciar Quartos" component={RoomManagerScreen}/>
            <Stack.Screen name="Cadastrar Quarto" component={CreateRoomScreen}/>
            <Stack.Screen name="Editar Quarto" component={EditRoomScreen}/>
            <Stack.Screen name="Detalhes do Quarto" component={DetailRoomScreen}/>
        </Stack.Navigator>
    );
}

export default MyHotelsStack;
