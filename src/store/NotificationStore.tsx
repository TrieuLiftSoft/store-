import { create } from "zustand";
import { MyStore } from "../model/InitStore";

const useNotification = create<MyStore>((set) => ({
  isSuccess: false,
  setSuccessTrue: () => set({ isSuccess: true }),
  setSuccessFalse: () => set({ isSuccess: false }),
}));

export default useNotification;
