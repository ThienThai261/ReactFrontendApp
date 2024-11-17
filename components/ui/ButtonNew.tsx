import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: object;  // Allow for custom styles
    textStyle?: object;  // Allow for custom text styles
}

const ButtonNew: React.FC<ButtonProps> = ({title, onPress, style, textStyle}) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6200ea',  // Purple background
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,  // Shadow for Android
        shadowColor: '#000',  // Shadow for iOS
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    text: {
        color: '#fff',  // White text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ButtonNew;
