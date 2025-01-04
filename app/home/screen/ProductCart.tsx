import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

import { router } from "expo-router";
import Feather from "react-native-vector-icons/Feather";
import { useCart } from '@/app/(tabs)/(cart)/CartContent';
import { ImageIcon } from "lucide-react";

const API = "http://192.168.0.107:9093";

interface ProductCartProps {
    item: {
        id: number;
        name: string;
        price: number;
        imageUrls?: string[];
    };
}

const ProductCart: React.FC<ProductCartProps> = ({ item }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
        Alert.alert('Success', 'Item added to cart!');
    };

    const imageSource = item.imageUrls?.[0]
        ? { uri: `${API}${item.imageUrls[0]}` }
        : require("@/assets/images/react-logo.png");

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                router.push({
                    pathname: './home/screen/Detail',
                    params: { item: JSON.stringify(item) }
                });
            }}
        >
            <View style={styles.card}>
                {item.imageUrls?.length && item.imageUrls.length > 0 ? (
                    <Image
                        source={imageSource}
                        style={styles.coverImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={[styles.coverImage, styles.placeholderContainer]}>
                        <ImageIcon size={40} color="#999" />
                    </View>
                )}

                <View style={styles.contentContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${item.price}</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                        >
                            <Feather name="shopping-cart" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    coverImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#f5f5f5',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#444444",
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 18,
        color: "#444444",
        fontWeight: "600",
    },
    btn: {
        padding: 10,
        backgroundColor: "#E96E6E",
        borderRadius: 12,
    },
});

export default ProductCart;