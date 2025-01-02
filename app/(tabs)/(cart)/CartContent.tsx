import React, {createContext, useContext, useState} from 'react';

type CartItem = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    brand?: string;
    thumbnailUrl?: string;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, increment: boolean) => void;
    getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
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

    const addToCart = (product: any) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            }
            return [...prevItems, {
                id: product.id,
                name: product.name,
                price: product.price,
                brand: product.brand || 'Unknown',
                quantity: 1,
                thumbnailUrl: product.thumbnailUrl
            }];
        });
    };

    const removeFromCart = (productId: string | number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string | number, increment: boolean) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? {...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1))}
                    : item
            )
        );
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};