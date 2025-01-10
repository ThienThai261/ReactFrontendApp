import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface PurchasedProduct {
    orderId: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    material: string;
    size: string;
    gender: string;
    categoryId: number;
    thumbnailUrl: string;
    orderStatus: number;
    orderDate: string;
}

const PurchasedProducts = () => {
    const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPurchasedProducts();
    }, []);

    const fetchPurchasedProducts = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userDetails');
            if (!token) {
                throw new Error('User is not logged in');
            }

            const userDetails = JSON.parse(token);
            const accountId = userDetails.id;

            const response = await axios.get(
                `http://192.168.0.107:9093/purchases/user/${accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setPurchasedProducts(response.data);
            } else {
                throw new Error('Failed to fetch purchased products');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.returnButton}>
                    <Text style={styles.returnButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Purchased Products</Text>
            </View>
            <FlatList
                data={purchasedProducts}
                keyExtractor={(item) => `${item.orderId}-${item.productId}`}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Text style={styles.productName}>{item.productName}</Text>
                        <Text>Order ID: {item.orderId}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text>Purchase Date: {new Date(item.orderDate).toLocaleDateString()}</Text>
                        <Text>Price: ${item.price}</Text>
                        {item.material && <Text>Material: {item.material}</Text>}
                        {item.size && <Text>Size: {item.size}</Text>}
                        {item.gender && <Text>Gender: {item.gender}</Text>}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    returnButton: {
        marginRight: 8,
    },
    returnButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a73e8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    productCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default PurchasedProducts;
