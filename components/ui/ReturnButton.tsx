import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const ReturnButton = () => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1a73e8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ReturnButton;
