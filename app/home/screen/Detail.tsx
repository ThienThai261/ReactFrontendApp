import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useCart } from '@/app/(tabs)/(cart)/CartContent';

// Define the type for your product item
interface ProductItem {
    id: number;
    name: string;
    price: number;
    size: string;
    quantity: number;
    material: string;
    gender: string;
    status: string;
    id_category: number;
    thumbnailUrl: string;
    imageUrls: string[];
}

// Define the type for route params
type DetailRouteParams = {
    Detail: {
        item: ProductItem;
    };
};

export default function Detail() {
    const route = useRoute<RouteProp<DetailRouteParams, 'Detail'>>();
    const item = route.params.item;
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    function processString(inputString: string | undefined): string[] {
        if (inputString) {
            const elements = inputString.split(',');
            return elements.map(element => element.trim());
        }
        return [];
    }

    const colorMapping = {
        Đen: "#000000",
        "Xanh rêu": "#0A5C36",
        "Xám ghi": "",
        Đỏ: "#FF0000",
        Trắng: "#FFFFFF",
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            Alert.alert('Error', 'Please select a size');
            return;
        }
        if (!selectedColor) {
            Alert.alert('Error', 'Please select a color');
            return;
        }

        const productWithOptions = {
            ...item,
            selectedSize,
            selectedColor,
            id: `${item.id}-${selectedSize}-${selectedColor}`, // Create unique ID for different variations
        };

        try {
            addToCart(productWithOptions);
            Alert.alert('Success', 'Item added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            Alert.alert('Error', 'Failed to add item to cart');
        }
    };

    const handleBuyNow = () => {
        if (!selectedSize || !selectedColor) {
            Alert.alert('Error', 'Please select both size and color');
            return;
        }

        handleAddToCart();
        // Add navigation to checkout here
        // router.push('/checkout');
    };

    const items = JSON.parse(item);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <Header /> */}
                </View>

                {/* IMG detail */}
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={styles.imageContainer}
                />

                {/* Info */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{items.name}</Text>
                    <Text style={[styles.title, styles.price]}>${items.price}</Text>
                    <Text style={styles.title}>Gender: {items.gender}</Text>
                </View>

                {/* Sizes */}
                <Text style={[styles.title, styles.sizeText]}>Size</Text>
                <View style={styles.sizeContainer}>
                    {processString(items.size).map((size, index) => (
                        <TouchableOpacity
                            key={`size-${index}`}
                            style={[
                                styles.sizeValueContainer,
                                selectedSize === size && styles.selectedSizeContainer,
                                size.length > 4 && { width: '5%' }
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={[
                                styles.sizeValue,
                                selectedSize === size && styles.selectedText
                            ]}>
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Colors */}
                {items.color ? (
                    <>
                        <Text style={[styles.title, styles.colorText]}>Colors</Text>
                        <View style={styles.colorContainer}>
                            {processString(items.color).map((color, index) => (
                                !colorMapping[color] ? (
                                    // Hiển thị tên màu nếu không có mã màu
                                    <TouchableOpacity
                                        key={`color-${index}`}
                                        style={[
                                            styles.sizeValueContainer,
                                            selectedSize === color && styles.selectedSizeContainer,
                                            color.length > 4 && { width: '10%' }
                                        ]}
                                        onPress={() => setSelectedSize(color)}
                                    >
                                        <Text style={[
                                            styles.sizeValue,
                                            selectedSize === color && styles.selectedText
                                        ]}>
                                            {color}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        key={`color-${index}`}
                                        style={[
                                            styles.circleBorder,
                                            selectedColor === colorMapping[color] && { borderColor: colorMapping[color], borderWidth: 2 }
                                        ]}
                                        onPress={() => setSelectedColor(colorMapping[color])}
                                    >
                                        <View style={[styles.circle, { backgroundColor: colorMapping[color] }]} />
                                    </TouchableOpacity>
                                )
                            ))}
                        </View>
                    </>
                ) : null}


                <View style={styles.btn}>
                    {/* Buy */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleBuyNow}
                    >
                        <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>

                    {/* Add to cart */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.buttonText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

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
        marginBottom: 10,
    },
    sizeContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
    },
    sizeValueContainer: {
        backgroundColor: "#FFFFFF",
        height: 36,
        width: 50,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedSizeContainer: {
        borderColor: "#E55B5B",
    },
    sizeValue: {
        fontSize: 18,
        fontWeight: "600",
    },
    colorText: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
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
    },
});