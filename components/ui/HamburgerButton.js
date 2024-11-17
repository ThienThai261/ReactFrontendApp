// src/components/HamburgerButton.js
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

const HamburgerButton = ({onPress, color = '#000'}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
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