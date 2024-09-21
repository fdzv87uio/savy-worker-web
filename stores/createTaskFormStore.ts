import { string } from 'yup';
import { create } from 'zustand';

type Inputs = {
    // step 1
    title: string;
    description: string;
    instructions: string;
    reward: number;
    // step 2
    startDate?: Date;
    endDate?: Date;
    location?: string;
    address?: string;
    city?: string;
    country?: string;
    step?: number;
    progress?: number;
    status: string;
    classes?: string;
};

type InputsStore = {
    inputs: Inputs;
    setInputs: (inputs: Inputs) => void;
};

export const createTaskFormStore = create<InputsStore>((set) => ({
    inputs: {
        // step 1
        title: '',
        description: '',
        instructions: '',
        reward: 0,
        // step 2
        startDate: new Date(),
        endDate: new Date(),
        location: '',
        address: '',
        city: '',
        country: '',
        step: 1,
        progress: 10,
        status: '',
        classes: '',
    },
    setInputs: (inputs: Inputs) => set({ inputs }),
}));
