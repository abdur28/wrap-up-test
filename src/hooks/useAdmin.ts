import { create } from "zustand";

type AdminState = {
    services: any[];
    products: any[];
    receipts: any[];
    reviews: any[];
    isLoading: boolean;
    message: string;
    getProducts: () => void;
    getServices: () => void;
    deleteItem: ({type, id}: {type: string, id: string}) => void;
    deleteImage: (urls: string[]) => void;
    updateItem: ({type, id, data}: {type: string, id: string, data: any}) => void;
    getReceipts: () => void;
    getReviews: () => void;
    approveReview: ({id}: {id: string}) => void;
    deleteReview: ({id}: {id: string}) => void;
};

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const useAdmin = create<AdminState>((set) => ({
    services: [],
    message: "",
    receipts: [],
    reviews: [],
    products: [],
    isLoading: false,
    getServices: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/action/get-services",{
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "all" }),
            });
            const services = await response.json();
            set({ services: services.services, isLoading: false });
            return services;
        } catch (err) {
            console.error("Failed to fetch services:", err);
            set({ isLoading: false });
        }
    },
    getProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/action/get-products",{
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "all" }),
            });
            const products = await response.json();
            set({ products: products.products, isLoading: false });
            return products;
        } catch (err) {
            console.error("Failed to fetch products:", err);
            set({ isLoading: false });
        }
    },
    deleteItem: async ({type, id}: {type: string, id: string}) => {
        try {
            const response = await fetch("/api/action/delete-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({type, id}),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Failed to delete item:", err);
        }
    }, 
    deleteImage: async (urls: string[]) => {
        set({ isLoading: true });
        if (urls.length === 0) {
            return
        };
        try {
            const response = await fetch("/api/action/delete-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({urls}),
            });
            const data = await response.json();
            set({ isLoading: false });
            return data;
        } catch (err) {
            console.error("Failed to delete image:", err);
        }
    },
    updateItem: async ({type, id, data}: {type: string, id: string, data: any}) => {
        try {
            set({ isLoading: true });
            const response = await fetch("/api/action/update-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({type, id, data}),
            });
            await response.json();
            set({ isLoading: false });
        } catch (err) {
            console.error("Failed to update item:", err);
        }
    },
    getReceipts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/action/get-receipts", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "all" }),
            });
            const res = await response.json();
            set({ receipts: res.receipts, isLoading: false });
            return res;
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            set({ isLoading: false });
        }
    },
    getReviews: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/action/get-reviews",{
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "all" }),
            });
            const res = await response.json();
            set({ reviews: res.reviews, isLoading: false });
            return res;
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            set({ isLoading: false });
        }
    },
    approveReview: async ({id}: {id: string}) => {
        try {
            const response = await fetch("/api/action/approve-review", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id}),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Failed to approve review:", err);
        }
    },
    deleteReview: async ({id}: {id: string}) => {
        try {
            const response = await fetch("/api/action/delete-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({type: 'reviews', id}),
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Failed to delete review:", err);
        }
    },
}))