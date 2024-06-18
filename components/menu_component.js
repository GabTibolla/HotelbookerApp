import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home_screen';
import HotelStack from '../screens/hotel_stack';
import ReserveStack from '../screens/reserve_stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRole} from "../utils/token_context";
import  VectorIcons  from 'react-native-vector-icons/FontAwesome5';
import MyHotelsScreen from "../screens/my_hotels_screen";
import MyHotelsStack from "../screens/my_hotels_stack";

const Tab = createBottomTabNavigator();

function MyTabs() {
    const { role } = useRole();


    return (
        <Tab.Navigator>
            {role === "USER" ? (
            <Tab.Screen
                name="Destaques"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Destaques',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />):
                <Tab.Screen
                    name="Estatísicas"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Estatísticas',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
            }
            {role === "USER" ? (
            <Tab.Screen
                name="Hotels"
                component={HotelStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Hotéis',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bed" color={color} size={size} />
                    ),
                }}
            />): null}
            {role === "USER" ? (
            <Tab.Screen
                name="Reservas"
                component={ReserveStack}
                options={{
                    headerShown: false,
                    tabBarLabel: "Reservas",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar" color={color} size={size} />
                    ),
                }}
            /> ): null}
            {role === "ADMIN" ? (
                <Tab.Screen
                    name="Meu Hotel"
                    component={MyHotelsStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Meu Hotel",
                        tabBarIcon: ({ color, size }) => (
                            <VectorIcons name={"hotel"} color={color} size={size} />
                        ),
                    }}
                />
            ) : null}
        </Tab.Navigator>
    );
}

export default MyTabs;
