import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login_screen';
import MyTabs from './components/menu_component';
import {TokenProvider} from "./utils/token_context";
import SignUpScreen from "./screens/signup_screen";

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Main"
                component={MyTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
        />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <TokenProvider>
                <AuthNavigator />
            </TokenProvider>
        </NavigationContainer>
    );
}
