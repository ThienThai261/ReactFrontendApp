import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Button,
    Alert,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView
} from "react-native";

const API_BASE_URL = "http://192.168.0.107:9093";

// Interfaces
interface Voucher {
    id: number;
    code?: string;
    discountAmount: number;
    description?: string;
    status: number;
    usageCount: number;
    maxUsage: number;
}

interface VoucherFormData {
    id?: number;  // Added id field
    code: string;
    discountAmount: string;
    description: string;
    maxUsage: string;
}

// Voucher Form Modal Component
const VoucherFormModal = ({
                              isVisible,
                              onClose,
                              onSubmit,
                              title,
                              initialData,
                              isLoading
                          }: {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (data: VoucherFormData) => void;
    title: string;
    initialData: VoucherFormData;
    isLoading: boolean;
}) => {
    const [localFormData, setLocalFormData] = useState<VoucherFormData>(initialData);

    useEffect(() => {
        setLocalFormData(initialData);
    }, [initialData]);

    const handleSubmit = () => {
        if (!localFormData.code || !localFormData.discountAmount || !localFormData.maxUsage) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }
        onSubmit(localFormData);
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Voucher Code"
                        value={localFormData.code}
                        onChangeText={(text) => setLocalFormData(prev => ({...prev, code: text}))}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Discount Amount"
                        keyboardType="numeric"
                        value={localFormData.discountAmount}
                        onChangeText={(text) => setLocalFormData(prev => ({...prev, discountAmount: text}))}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={localFormData.description}
                        onChangeText={(text) => setLocalFormData(prev => ({...prev, description: text}))}
                        multiline
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Max Usage"
                        keyboardType="numeric"
                        value={localFormData.maxUsage}
                        onChangeText={(text) => setLocalFormData(prev => ({...prev, maxUsage: text}))}
                    />

                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={onClose} disabled={isLoading}/>
                        <Button
                            title={isLoading ? "Submitting..." : "Submit"}
                            onPress={handleSubmit}
                            disabled={isLoading}
                        />
                    </View>
                    {isLoading && <ActivityIndicator style={styles.loader}/>}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

// Main Voucher Manager Component
const VoucherManager: React.FC = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [searchId, setSearchId] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Voucher | null>(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<VoucherFormData>({
        code: "",
        discountAmount: "",
        description: "",
        maxUsage: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const emptyFormData: VoucherFormData = {
        code: "",
        discountAmount: "",
        description: "",
        maxUsage: ""
    };

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/vouchers/all`);
            console.log('Fetched vouchers:', response.data); // Add this line
            setVouchers(response.data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching vouchers:', err);
            setError('Failed to fetch vouchers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const handleUpdatePress = useCallback((voucher: Voucher) => {
        setSelectedVoucher({
            id: voucher.id,  // Include the id when setting selected voucher
            code: voucher.code || "",
            discountAmount: voucher.discountAmount.toString(),
            description: voucher.description || "",
            maxUsage: voucher.maxUsage.toString()
        });
        setIsUpdateModalVisible(true);
    }, []);

    const handleSubmitAdd = async (formData: VoucherFormData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/vouchers`, {
                code: formData.code,
                discountAmount: parseFloat(formData.discountAmount),
                description: formData.description,
                maxUsage: parseInt(formData.maxUsage),
                status: 1,
                usageCount: 0
            });

            Alert.alert("Success", "Voucher created successfully");
            setIsAddModalVisible(false);
            fetchVouchers();
        } catch (err: any) {
            Alert.alert("Error", "Failed to create voucher");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitUpdate = async (formData: VoucherFormData) => {
        if (!formData.id) {
            Alert.alert("Error", "No voucher selected for update");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.put(`${API_BASE_URL}/vouchers/${formData.id}`, {
                code: formData.code,
                discountAmount: parseFloat(formData.discountAmount),
                description: formData.description,
                maxUsage: parseInt(formData.maxUsage)
            });

            Alert.alert("Success", "Voucher updated successfully");
            setIsUpdateModalVisible(false);
            fetchVouchers();
        } catch (err: any) {
            Alert.alert("Error", "Failed to update voucher");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this voucher?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_BASE_URL}/vouchers/${id}`);
                            Alert.alert("Success", "Voucher deleted successfully");
                            fetchVouchers();
                        } catch (err) {
                            Alert.alert("Error", "Failed to delete voucher");
                        }
                    }
                }
            ]
        );
    };

    const searchById = async () => {
        if (!searchId) {
            Alert.alert("Error", "Please enter an ID");
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/vouchers/${searchId}`);
            setSearchResult(response.data);
        } catch (err) {
            setSearchResult(null);
            Alert.alert("Error", "Voucher not found");
        }
    };

    if (loading) return <ActivityIndicator style={styles.loader}/>;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voucher Manager</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Voucher ID"
                    value={searchId}
                    onChangeText={setSearchId}
                    keyboardType="numeric"
                />
                <Button title="Search" onPress={searchById}/>
            </View>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setIsAddModalVisible(true)}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>

            <VoucherFormModal
                isVisible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={handleSubmitAdd}
                title="Add New Voucher"
                initialData={emptyFormData}
                isLoading={isSubmitting}
            />

            <VoucherFormModal
                isVisible={isUpdateModalVisible}
                onClose={() => setIsUpdateModalVisible(false)}
                onSubmit={handleSubmitUpdate}
                title="Update Voucher"
                initialData={selectedVoucher}
                isLoading={isSubmitting}
            />

            <FlatList
                data={vouchers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={styles.voucherInfo}>
                            {/* Add code to display */}
                            <Text style={styles.code}>Code: {item.code || 'N/A'}</Text>
                            {/* Fix discount display */}
                            <Text>Discount: ${item.discountAmount?.toFixed(2) || '0.00'}</Text>
                            {/* Fix usage display */}
                            <Text>Usage: {item.usageCount || 0}/{item.maxUsage || 0}</Text>
                            {/* Fix status display */}
                            <Text>Status: {item.status === 1 ? 'Active' : 'Inactive'}</Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleUpdatePress(item)}
                            >
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 8,
    },
    card: {
        flexDirection: "row",
        padding: 16,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    voucherInfo: {
        flex: 1,
    },
    code: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    actionButtons: {
        flexDirection: "column",
        justifyContent: "space-around",
    },
    editButton: {
        padding: 8,
    },
    editButtonText: {
        fontSize: 20,
        color: "#007AFF",
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        fontSize: 20,
        color: "#FF3B30",
    },
    floatingButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        zIndex: 1,
    },
    floatingButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        width: '100%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    loader: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default VoucherManager;