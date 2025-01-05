import React from 'react';
import {router} from "expo-router";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {useCart} from './CartContent';

import Header from "@/components/ui/Header";

const API = "http://192.168.0.107:9093";

const Cart = () => {
    const {cartItems, removeFromCart, updateQuantity, getCartTotal} = useCart();

    const handleQuantityChange = (id, increment) => {
        updateQuantity(id, increment);
    };

    const handleCheckOutPress = () => {
        router.push("./CheckOutScreen");
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const calculateTotal = () => {
        return getCartTotal();
    };

    const renderItem = ({item}) => {
        // Handle image source based on thumbnailUrl or fallback
        const imageSource = item.thumbnailUrl
            ? { uri: `${API}${item.thumbnailUrl}` }
            : require('@/assets/images/react-logo.png');

        return (
            <View style={styles.itemContainer}>
                {item.thumbnailUrl ? (
                    <Image
                        source={imageSource}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={[styles.image, styles.placeholderContainer]}></View>
                )}
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(item.id, false)}
                        >
                            <Text style={styles.quantityText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(item.id, true)}
                        >
                            <Text style={styles.quantityText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                    <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                        <Text style={styles.removeText}>🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header at the top */}
            <View >
                <Header />
            </View>

            {/* Content below the header */}
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainer}
            />
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Subtotal</Text>
                <Text style={styles.summaryValue}>${calculateTotal()}</Text>
                <Text style={styles.summaryText}>Shipping</Text>
                <Text style={styles.summaryValue}>—</Text>
                <Text style={styles.summaryText}>Taxes</Text>
                <Text style={styles.summaryValue}>—</Text>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalValue}>${calculateTotal()}</Text>
            </View>
            <TouchableOpacity onPress={handleCheckOutPress} style={styles.checkoutButton}>
                <Text style={styles.checkoutText}>CONTINUE TO CHECKOUT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 60, // Adjust for header height
        paddingHorizontal: 20,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensure the header is on top of other components
        backgroundColor: '#fff', // Same background color as the page
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemBrand: {
        color: 'gray',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 16,
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    itemPriceContainer: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeText: {
        marginTop: 10,
        color: 'red',
    },
    summaryContainer: {
        marginTop: 20,
    },
    summaryText: {
        fontSize: 16,
        color: 'gray',
    },
    summaryValue: {
        fontSize: 16,
        marginBottom: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkoutButton: {
        backgroundColor: '#00bcd4',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Cart;