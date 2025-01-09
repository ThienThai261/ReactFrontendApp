import React from 'react';
import { useVoucher } from '../contexts/VoucherContext';

const VoucherDisplay = ({ cartTotal }) => {
    const { activeVoucher, discountAmount, totalAfterDiscount, clearVoucher } = useVoucher();

    if (!activeVoucher) {
        return null;
    }

    return (
        <div className="w-full bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-700">{activeVoucher.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
            ({activeVoucher.discountType === 'PERCENTAGE' ?
                        `${activeVoucher.discountValue}%` :
                        `$${activeVoucher.discountValue}`} off)
          </span>
                </div>
                <button
                    onClick={clearVoucher}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Original Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                    <span>Final Total:</span>
                    <span>${totalAfterDiscount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default VoucherDisplay;