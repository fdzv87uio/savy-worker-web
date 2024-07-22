import { create } from 'zustand';

type Inputs = {
  eventType?: string;
  title?: string;
  description?: string;
  recurring?: string;
  frequency?: string;
  date?: string;
  online?: string;
  location?: string;
  step: number;
};

type InputsStore = {
  inputs: Inputs;
  setInputs: (inputs: Inputs) => void;
};

export const createEventFormStore = create<InputsStore>((set) => ({
  inputs: {
    eventType: '',
    title: '',
    description: '',
    recurring: '',
    frequency: '',
    date: '',
    online: '',
    location: '',
    step: 1,
  },
  setInputs: (inputs: Inputs) => set({ inputs }),
}));
