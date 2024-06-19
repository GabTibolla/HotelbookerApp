import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
    useEffect(() => {
        const headerRight = () => (
            <MaterialCommunityIcons
                name="logout"
                size={25}
                onPress={handleLogout}
                style={{ marginRight: 15 }}
            />
        );

        navigation.setOptions({
            headerRight,
        });
    }, [navigation]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

export default HomeScreen;