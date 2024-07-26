import { create } from "zustand";

type ReceiptsState = {
    receipts: any[];
    isLoading: boolean;
    getReceipts: () => void;
};

export const useReceipt = create<ReceiptsState>((set) => ({
    receipts: [],
    isLoading: true,
    getReceipts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/action/get-receipts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "single" }),
            });
            const res = await response.json();
            set({ receipts: res.receipts, isLoading: false });
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            set({ isLoading: false });
        }
    },
}));


