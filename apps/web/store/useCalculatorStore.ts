import { create } from "zustand";

interface CalculatorStore {
  method: 1 | 2;
  setMethod: (method: CalculatorStore["method"]) => void;
}

const useCalculatorStore = create<CalculatorStore>((set) => ({
  method: 1,
  setMethod: (method) => set({ method }),
}));

export default useCalculatorStore;
