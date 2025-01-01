import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

const CheckoutScreen = ({navigation}: { navigation: any }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Checkout</Text>

            <View style={styles.stepsContainer}>
                <Text style={[styles.step, styles.activeStep]}>1</Text>
                <Text style={styles.stepDivider}></Text>
                <Text style={styles.step}>2</Text>
                <Text style={styles.stepDivider}></Text>
                <Text style={styles.step}>3</Text>
            </View>

            <TouchableOpacity style={styles.cartDetailsButton}>
                <Text style={styles.cartDetailsText}>Show cart details</Text>
                <Text style={styles.cartAmount}>$165</Text>
            </TouchableOpacity>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="bdelhamid@email.com" keyboardType="email-address"/>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="Abdelhamid Larachi"/>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} placeholder="1060 W Addison St"/>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Apt, Suite, Bldg (optional)</Text>
                <TextInput style={styles.input} placeholder="Building 14"/>
            </View>

            <View style={styles.row}>
                <TextInput style={[styles.input, styles.zipInput]} placeholder="15900" keyboardType="numeric"/>
                <Text style={styles.city}>Chicago, IL</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input} placeholder="(123) 456 - 7890" keyboardType="phone-pad"/>
                <Text style={styles.link}>Another number</Text>
            </View>

            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate('Index')} // Change to your cart screen name
            >
                <Text style={styles.checkoutButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    step: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ccc',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ccc',
    },
    activeStep: {
        borderColor: '#00bfff',
        color: '#00bfff',
    },
    stepDivider: {
        width: 40,
        height: 2,
        backgroundColor: '#ccc',
    },
    cartDetailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    cartDetailsText: {
        fontSize: 16,
        color: '#333',
    },
    cartAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    zipInput: {
        flex: 1,
        marginRight: 10,
    },
    city: {
        flex: 2,
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#00bfff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 5,
        fontSize: 14,
        color: '#00bfff',
        textDecorationLine: 'underline',
    },
    checkoutButton: {
        marginTop: 20,
        backgroundColor: '#00bfff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;
