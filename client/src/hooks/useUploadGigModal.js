import { create } from 'zustand';

const useUploadGigModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useUploadGigModal;