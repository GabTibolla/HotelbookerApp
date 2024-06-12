import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home_screen';
import SettingsScreen from '../screens/settings_screen';
import ReserveScreen from '../screens/reserve_screen';
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
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarLabel: 'Hotels',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bed" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="Reserve" component={ReserveScreen} options={{
                tabBarLabel: 'Reservas',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="calendar" color={color} size={size} />
                ),
            }}/>
        </Tab.Navigator>
    );
}

export default MyTabs;