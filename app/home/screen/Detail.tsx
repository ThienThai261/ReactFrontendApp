import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

//const Detail = () => {
export default function Detail() {
    const route = useRoute()
    const item = route.params.item

    function processString(inputString) {
        if (inputString) {
            // Chia chuỗi thành mảng các phần tử
            const elements = inputString.split(',');

            // Xử lý từng phần tử: loại bỏ khoảng trắng và chuyển thành chữ thường
            const processedElements = elements.map(element => element.trim());
            return processedElements;

        } else console.error("Input string is undefined")
    }

    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    const colorsArray = [
        "#91A1B0",
        "#B11D1D",
        "#1F44A3",
        "#9F632A",
        "#1D752B",
        "#000000",
    ]

    return (
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <Header /> */}
                </View>

                {/* IMG detail */}
                <Image source={require('@/assets/images/react-logo.png')} style={styles.imageContainer} />

                {/* Info */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={[styles.title, styles.price]}>{item.price} đ</Text>
                </View>

                {/* Sizes */}
                <Text style={[styles.title, styles.sizeText]}>Size</Text>
                <View style={styles.sizeContainer}>
                    {processString(item.size).map((size) => {
                        return (
                            <TouchableOpacity style={styles.sizeValueContainer}
                                onPress={() => {
                                    setSelectedSize(size)
                                }}>
                                <Text style={[
                                    styles.sizeValue,
                                    selectedSize == size && { color: "#E55B5B" }]}>{size}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* Colors */}
                <Text style={[styles.title, styles.colorText]}>Colors</Text>
                <View style={styles.colorContainer}>
                    {
                        colorsArray.map((color) => {
                            return (
                                <TouchableOpacity style={[styles.circleBorder, selectedColor === color && { borderColor: color, borderWidth: 2 }]}
                                    onPress={() => {
                                        setSelectedColor(color)
                                    }}>
                                    <View style={[styles.circle, { backgroundColor: color }]}></View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <View style={styles.btn}>
                    {/* Buy */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>

                    {/* Add to cart */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

//export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
    },
    imageContainer: {
        height: 520,
        width: "100%",
    },
    contentContainer: {
        //flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#444444",
    },
    price: {
        marginTop: 10,
        textAlign: "right",
        color: "#4D4C4C",
    },
    sizeText: {
        marginHorizontal: 20,
    },
    sizeContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
    },
    sizeValueContainer: {
        backgroundColor: "#FFFFFF",
        height: 36,
        width: 50,
        //width: "100%",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    sizeValue: {
        fontSize: 18,
        fontWeight: "600",
    },
    colorText: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    selectedText: {
        color: "#E55B5B",
    },
    colorContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
    },
    circle: {
        height: 36,
        width: 36,
        borderRadius: 20,
    },
    circleBorder: {
        marginHorizontal: 5,
        height: 48,
        width: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "#E96E6E",
        height: 62,
        width: 162,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: "5%",
    },
    buttonText: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: "700",
        //marginHorizontal: "20%",
    },
});