import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Feather from "react-native-vector-icons/Feather"

const ProductCart = ({ item }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('home/screen/Detail', { item })
        }} style={styles.container}>
            <Image source={require("@/assets/images/react-logo.png")} style={styles.coverImage}></Image>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity style={styles.btn}><Feather name='shopping-cart' size={26}></Feather></TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCart

const styles = StyleSheet.create({
    btn: {
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "flex-end",
        padding: 12,
        backgroundColor: "#E96E6E",
        borderRadius: 16,
    },
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    coverImage: {
        height: 256,
        width: "90%",
        borderRadius: 20,
        position: "relative",
        marginVertical: 10,
        marginLeft: 10,
    },
    contentContainer: {
        //flexDirection: "row",
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#444444",
    },
    price: {
        fontSize: 18,
        color: "#444444",
        fontWeight: "600",
    },
    likeContainer: {
        position: "absolute",
        padding: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        right: 10,
        top: 10,
    },
    faviorate: {
        height: 20,
        width: 20,
    },
});