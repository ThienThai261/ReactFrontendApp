import React, {useState} from 'react';
import {router} from "expo-router";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: 'FRANCE AUTHENTIC JERSEY 2018 (L) (HOME)',
            brand: 'NIKE',
            price: 165,
            quantity: 1,
        },
        {
            id: '2',
            name: 'FRANCE AUTHENTIC JERSEY 2018 (L) (HOME)',
            brand: 'NIKE',
            price: 165,
            quantity: 1,
        },
        {
            id: '3',
            name: 'FRANCE AUTHENTIC JERSEY 2018 (L) (HOME)',
            brand: 'NIKE',
            price: 165,
            quantity: 1,
        },
    ]);

    const handleQuantityChange = (id, increment) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + (increment ? 1 : -1)),
                    }
                    : item
            )
        );
    };
    const handleCheckOutPress = () => {
        router.push("./CheckOutScreen"); // Correctly routes to the index within the (auth) group
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const renderItem = ({item}) => (
        <View style={styles.itemContainer}>
            <Image
                source={require('@/assets/images/placeholder.jpg')}
                style={styles.image}
            />
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
            <TouchableOpacity onPress={() => handleCheckOutPress} style={styles.checkoutButton}>
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

export default CartScreen;
