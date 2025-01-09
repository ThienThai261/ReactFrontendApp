import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = "http://192.168.0.107:9093/demo";

export default function AccountSettings() {
    const [userId, setUserId] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        try {
            const userDetailsStr = await AsyncStorage.getItem('userDetails');
            if (userDetailsStr) {
                const userDetails = JSON.parse(userDetailsStr);
                setUserId(userDetails.id);
                setFullname(userDetails.fullname);
                setPhone(userDetails.phone);
            }
        } catch (error) {
            console.error('Error loading user details:', error);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('oldPassword', oldPassword);
            formData.append('newPassword', newPassword);

            const response = await axios.put(
                `${API_BASE_URL}/changePassword/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data === 'Password updated successfully') {
                Alert.alert('Success', 'Password changed successfully');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                Alert.alert('Error', response.data);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            Alert.alert('Error', 'Failed to change password');
        }
    };

    const handleUpdateInfo = async () => {
        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('phone', phone);

            const response = await axios.put(
                `${API_BASE_URL}/updateInfo/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data === 'User information updated successfully') {
                // Update stored user details
                const userDetailsStr = await AsyncStorage.getItem('userDetails');
                if (userDetailsStr) {
                    const userDetails = JSON.parse(userDetailsStr);
                    const updatedDetails = {
                        ...userDetails,
                        fullname,
                        phone,
                    };
                    await AsyncStorage.setItem('userDetails', JSON.stringify(updatedDetails));
                }
                Alert.alert('Success', 'Profile information updated successfully');
            } else {
                Alert.alert('Error', response.data);
            }
        } catch (error) {
            console.error('Error updating user info:', error);
            Alert.alert('Error', 'Failed to update profile information');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Change Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Current Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={handleChangePassword}>
                    <LinearGradient
                        colors={['#6a11cb', '#2575fc']}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Change Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Update Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#aaa"
                    value={fullname}
                    onChangeText={setFullname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#aaa"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TouchableOpacity onPress={handleUpdateInfo}>
                    <LinearGradient
                        colors={['#6a11cb', '#2575fc']}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    button: {
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});