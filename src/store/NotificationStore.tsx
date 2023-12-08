import create from "zustand";

interface MyStore {
  isSuccess: boolean;
  setSuccessTrue: () => void;
  setSuccessFalse: () => void;
}

const useNotification = create<MyStore>((set) => ({
  isSuccess: false,
  setSuccessTrue: () => set({ isSuccess: true }),
  setSuccessFalse: () => set({ isSuccess: false }),
}));

export default useNotification;
