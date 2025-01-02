import {router} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const handleLogout = async () => {
    try {
        // Clear auth token from axios headers
        delete axios.defaults.headers.common['Authorization'];

        // Clear all storage data
        await AsyncStorage.multiRemove([
            'userToken',
            'userDetails',
            'cartItems',
            'searchHistory'
        ]);

        // Navigate to login
        router.replace('.//(LoginAndRegister)/Login');
    } catch (error) {
        console.error('Logout error:', error);
        // Still attempt to navigate even if clearing fails
        router.replace('./(auth)/login');
    }
};