import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Stack } from 'expo-router';
import { useVoucher } from '../../../contexts/VoucherContext';
import { router } from 'expo-router';

const API_BASE_URL = 'http://192.168.0.107:9093/vouchers';

export default function VoucherScreen() {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { applyVoucher } = useVoucher();

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            setVouchers(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load vouchers');
            console.error('Error fetching vouchers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRedeem = async (voucherId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${voucherId}/use`);
            if (response.data) {
                applyVoucher(response.data);
                router.back();
            }
        } catch (err) {
            setError('Failed to redeem voucher');
            console.error('Error redeeming voucher:', err);
        }
    };

    const renderVoucherItem = ({ item }) => (
        <View style={styles.voucherContainer}>
            <View style={styles.leftContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.voucherImage}
                    defaultSource={require('../../../assets/images/voucher-logo.jpg')}
                />
            </View>

            <View style={styles.middleContainer}>
                <Text style={styles.voucherTitle}>{item.name}</Text>
                <TouchableOpacity
                    style={styles.moreInfoButton}
                    onPress={() => console.log('More info pressed for:', item.id)}
                >
                    <Text style={styles.moreInfoText}>More Info</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rightContainer}>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => console.log('Favorite pressed for:', item.id)}
                >
                    <Text style={styles.favoriteIcon}>♡</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.redeemButton}
                    onPress={() => handleRedeem(item.id)}
                >
                    <Text style={styles.redeemButtonText}>Redeem</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Available Vouchers",
                    headerShown: true,
                }}
            />
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={fetchVouchers}
                        >
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={vouchers}
                        renderItem={renderVoucherItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 16,
    },
    voucherContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    leftContainer: {
        marginRight: 12,
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    voucherImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    voucherTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    moreInfoButton: {
        marginTop: 4,
    },
    moreInfoText: {
        color: '#666',
        fontSize: 12,
    },
    favoriteButton: {
        padding: 4,
    },
    favoriteIcon: {
        fontSize: 20,
        color: '#666',
    },
    redeemButton: {
        backgroundColor: '#1a73e8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    redeemButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#1a73e8',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 4,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

