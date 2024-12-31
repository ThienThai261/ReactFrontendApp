// components/ui/HamburgerButton.js
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const HamburgerButton = ({color = '#000'}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        try {
            // Use toggleDrawer method
            if (navigation.toggleDrawer) {
                console.log('navigation:', navigation);
                navigation.toggleDrawer();
            } else {
                console.log('fall:', navigation);
                // Fallback to dispatch method
                navigation.dispatch(DrawerActions.toggleDrawer());
            }
        } catch (error) {
            console.warn('Navigation action failed:', error);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <View style={[styles.bar, {backgroundColor: color}]}/>
            <View style={[styles.bar, {backgroundColor: color}]}/>
            <View style={[styles.bar, {backgroundColor: color}]}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        justifyContent: 'space-between',
        height: 24,
    },
    bar: {
        width: 24,
        height: 2,
        borderRadius: 1,
    },
});

export default HamburgerButton;