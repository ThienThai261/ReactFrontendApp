import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function HamburgerButton() {
    const navigation = useNavigation();

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <TouchableOpacity onPress={toggleDrawer}>
            <MaterialIcons name="menu" size={24} color="#4caf50"/>
        </TouchableOpacity>
    );
}
