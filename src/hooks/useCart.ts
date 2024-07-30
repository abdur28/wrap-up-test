import { create } from "zustand";

type CartItem = {
    productId: string;
    productImage: string;
    productName: string;
    itemId: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
};

type CartState = {
    cart: any[];
    availableItems: any[];
    isLoading: boolean;
    counter: number;
    subtotal: number;
    getCart: () => void;
    getAvailableItems: (productId: string) => void;
    addItem: (item: CartItem) => void;
    addService: (item: { itemId: string; price: number, quantity: number }) => void;
    removeItem: (itemId: string) => void;
};

export const useCart = create<CartState>((set) => ({
    cart: [],
    availableItems: [],
    isLoading: false,
    subtotal: 0,
    counter: 0,
    getCart: async () => {
        set((state) => ({ ...state, isLoading: true }));
        try {
            const response = await fetch("/api/action/get-cart", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "all" }),
            });
            const cart = await response.json();
            const subtotal = cart.cart?.reduce(
                (acc: number, item: CartItem) => acc + item.price * item.quantity,
                0
            )
            set({ cart: cart.cart, isLoading: false, subtotal: subtotal, counter: cart.cart.length });
            return cart;
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            set({ isLoading: false });
        }
    },

    getAvailableItems: async (productId) => {
        set((state) => ({ ...state, isLoading: true }));
        try {
            const response = await fetch("/api/action/get-available-items", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId }),
            });
            const res = await response.json();
            set({ availableItems: res.availableItems, isLoading: false });
            return res;
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            set({ isLoading: false });
        }
    },

    addItem: async (item: CartItem) => {
        set((state) => ({ ...state, isLoading: true }));
        try {

            set((state) => ({ ...state, isLoading: true }));
            await fetch("/api/action/add-to-cart", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item), 
            }); 
            set((state) => ({
                cart: [...state.cart, item],
                counter: state.counter + 1,
                subtotal: state.subtotal + item.price * item.quantity,
                isLoading: false,
            }));
        } catch (error) {
            console.error("Failed to add item to cart:", error);
            set((state) => ({ ...state, isLoading: false }));   
        }
    },

    addService: async (item: { itemId: string; price: number, quantity: number }) => {
        try {
            set((state) => ({ ...state, isLoading: true }));
            await fetch("/api/action/add-to-cart", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
            set((state) => ({
                cart: [...state.cart, item],
                counter: state.counter + 1,
                subtotal: state.subtotal + item.price,
                isLoading: false,
            }));
        } catch (error) {
            console.error("Failed to add service to cart:", error);
            set((state) => ({ ...state, isLoading: false }));   
        }    
    },

    removeItem: async (itemId) => {
        try {
            set((state) => ({ ...state, isLoading: true }));
            await fetch("/api/action/remove-item", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }), 
            });
            set((state) => ({
                cart: [...state.cart.filter(item => item.itemId !== itemId)],
                subtotal: state.subtotal - state.cart.filter(item => item.itemId === itemId)[0].price * state.cart.filter(item => item.itemId === itemId)[0].quantity,
                counter: state.counter - 1,
                isLoading: false,
            }));
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            set((state) => ({ ...state, isLoading: false }));   
        }
    },
    
}));


