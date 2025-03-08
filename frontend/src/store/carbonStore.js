import { create } from "zustand";

export const useCarbonStore = create((set) => ({
  history: [],
  addRecord: (record) =>
    set((state) => ({ history: [...state.history, record] })),
}));
