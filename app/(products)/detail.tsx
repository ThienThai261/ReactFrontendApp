import React, {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {useLocalSearchParams} from "expo-router";
import axios from "axios";

interface Product {
    name: string;
    price: number;
    size: string; // Comma-separated sizes
}

interface Img {
    id: number;
    url: string;
}

const Detail = () => {
    const {id} = useLocalSearchParams(); // Fetch product ID from the route params
    const [product, setProduct] = useState<Product | null>(null);
    const [img, setImg] = useState<Img | null>(null);

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const colorsArray = [
        "#91A1B0",
        "#B11D1D",
        "#1F44A3",
        "#9F632A",
        "#1D752B",
        "#000000",
    ];

    useEffect(() => {
        loadProduct();
        loadImg();
    }, []);

    const loadProduct = async () => {
        try {
            const result = await axios.get<Product>(`http://192.168.0.107:9093/product/TL006`);
            console.log("Product data:", result.data);
            setProduct(result.data);
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    const loadImg = async () => {
        try {
            const result = await axios.get<Img>(`http://192.168.0.107:9093/imgs/TL006(1)`);
            console.log("Image data:", result.data);
            setImg(result.data);
        } catch (error) {
            console.error("Error loading image:", error);
        }
    };

    const sizz = product?.size ? product.size.split(", ") : [];

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* Header Placeholder */}
                </View>

                {/* Image Detail */}
                <Image
                    source={
                        img?.url
                            ? {uri: img.url}
                            : require("@/assets/images/placeholder.jpg") // Ensure placeholder image exists
                    }
                    style={styles.imageContainer}
                />

                {/* Product Info */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{product?.name || "Loading..."}</Text>
                    <Text style={[styles.title, styles.price]}>
                        {product?.price?.toLocaleString() || 0} đ
                    </Text>
                </View>

                {/* Sizes */}
                <Text style={[styles.title, styles.sizeText]}>Size</Text>
                <View style={styles.sizeContainer}>
                    {sizz.map((size) => (
                        <TouchableOpacity
                            key={size}
                            style={styles.sizeValueContainer}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text
                                style={[
                                    styles.sizeValue,
                                    selectedSize === size && {color: "#E55B5B"},
                                ]}
                            >
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Colors */}
                <Text style={[styles.title, styles.colorText]}>Colors</Text>
                <View style={styles.colorContainer}>
                    {colorsArray.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.circleBorder,
                                selectedColor === color && {borderColor: color, borderWidth: 2},
                            ]}
                            onPress={() => setSelectedColor(color)}
                        >
                            <View
                                style={[styles.circle, {backgroundColor: color}]}
                            ></View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Buttons */}
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Detail;

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
        width: 36,
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
    colorContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
    },
    circle: {
        height: 36,
        width: 36,
        borderRadius: 18,
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
    },
});
