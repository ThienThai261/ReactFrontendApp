import React, { createContext, useContext, useState } from 'react';

interface Voucher {
    id: number;
    name: string;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
}

interface VoucherContextType {
    activeVoucher: Voucher | null;
    discountAmount: number;
    totalAfterDiscount: number;
    applyVoucher: (voucher: Voucher, cartTotal: number) => void;
    clearVoucher: () => void;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

export function VoucherProvider({ children }: { children: React.ReactNode }) {
    const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

    const applyVoucher = (voucher: Voucher, cartTotal: number) => {
        setActiveVoucher(voucher);

        let discount = 0;
        if (voucher.discountType === 'PERCENTAGE') {
            discount = (cartTotal * voucher.discountValue) / 100;
        } else {
            discount = voucher.discountValue;
        }

        // Ensure discount doesn't exceed cart total
        discount = Math.min(discount, cartTotal);
        setDiscountAmount(discount);
        setTotalAfterDiscount(cartTotal - discount);
    };

    const clearVoucher = () => {
        setActiveVoucher(null);
        setDiscountAmount(0);
        setTotalAfterDiscount(0);
    };

    return (
        <VoucherContext.Provider
            value={{
                activeVoucher,
                discountAmount,
                totalAfterDiscount,
                applyVoucher,
                clearVoucher
            }}
        >
            {children}
        </VoucherContext.Provider>
    );
}

export function useVoucher() {
    const context = useContext(VoucherContext);
    if (context === undefined) {
        throw new Error('useVoucher must be used within a VoucherProvider');
    }
    return context;
}