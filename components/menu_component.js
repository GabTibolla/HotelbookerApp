import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home_screen';
import HotelStack from '../screens/hotel_stack';
import ReserveStack from '../screens/reserve_stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
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
            />
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
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
