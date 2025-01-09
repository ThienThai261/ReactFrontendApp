import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated,
    ViewToken,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Slide {
    id: string;
    image: any;
    title: string;
    description: string;
}

const slides: Slide[] = [
    {
        id: '1',
        image: require('../../../../assets/images/cart-icon.png'),
        title: 'Choose A Tasty Dish',
        description: 'Discover delicious meals from our wide selection of dishes, prepared with care and quality ingredients.',
    },
    {
        id: '2',
        image: require('../../../../assets/images/placeholder.jpg'),
        title: 'Discover Best Places',
        description: 'Find the best restaurants near you with ratings and reviews from our community.',
    },
    {
        id: '3',
        image: require('../../../../assets/images/splash-icon.png'),
        title: 'Fast Delivery',
        description: 'Get your favorite food delivered to your doorstep quickly and safely.',
    },
];

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList<Slide>>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0]) {
            setCurrentIndex(viewableItems[0].index ?? 0);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        console.log('ScrollTo triggered', { currentIndex });
        if (currentIndex < slides.length - 1 && slidesRef.current) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else if (currentIndex === slides.length - 1) {
            console.log('Navigating to login');
            router.push('./(auth)/login');
        }
    };

    const SlideItem: React.FC<{ item: Slide }> = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    const Pagination = () => {
        return (
            <View style={styles.paginationContainer}>
                {slides.map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    width: dotWidth,
                                    opacity,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    // Debugging for currentIndex
    useEffect(() => {
        console.log('Current Index Updated:', currentIndex);
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <SlideItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Pagination />
            <TouchableOpacity style={styles.button} onPress={scrollTo}>
                <Text style={styles.buttonText}>
                    {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        flex: 3,
    },
    slide: {
        width,
        height: height * 0.75,
        alignItems: 'center',
        padding: 20,
    },
    image: {
        flex: 0.7,
        width: width * 0.8,
        height: height * 0.4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6a11cb',
        marginHorizontal: 8,
    },
    button: {
        backgroundColor: '#6a11cb',
        padding: 15,
        borderRadius: 10,
        marginBottom: 50,
        width: width * 0.8,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
