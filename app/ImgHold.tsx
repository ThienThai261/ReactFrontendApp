import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

export default function ImgHold() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Hold Page</Text>
            <Image
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgCPQmyPHrOWxnUvbmQIRwOipjW8woZUreA&s'}} // Replace with actual direct image URL
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain', // Adjust the image to fit within the specified dimensions
    },
});
