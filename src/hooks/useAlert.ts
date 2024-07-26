import { create } from "zustand";

type AlertState = {
    text: string;
    type: string;
    show: boolean;
    showAlert: ({ text, type, show }: { text: string; type: string, show: boolean }) => void;
    hideAlert: () => void;
};

export const useAlert = create<AlertState>((set) => ({
    text: "",
    type: "",
    show: false,
    showAlert: ({ text, type, show }) => {
        set({ text, type, show: true });
    },
    hideAlert: () => set({ text: "", type: "", show: false }),
}));
