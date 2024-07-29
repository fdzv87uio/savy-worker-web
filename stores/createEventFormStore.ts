import { string } from 'yup';
import { create } from 'zustand';

type Inputs = {
  // step 1
  eventType?: string;
  title?: string;
  description?: string;
  mode?: string;
  location?: string;
  // step 2
  startDate?: Date;
  hours?: number;
  minutes?: number;
  amPm?: string;
  recurring?: string;
  frequency?: string;
  repeatNumber?: number;
  repeatType?: string;
  repeatOn?: string[];
  eventEnds?: string;
  datePick?: Date;
  ocurrences?: number;
  // step 3
  prefe?: string[];
  prefeIds?:string[];

  step?: number;
  progress?:number;
};

type InputsStore = {
  inputs: Inputs;
  setInputs: (inputs: Inputs) => void;
};

export const createEventFormStore = create<InputsStore>((set) => ({
  inputs: {
    // step 1
    eventType: '',
    title: '',
    description: '',
    mode: '',
    location: '',
    // step 2
    startDate: new Date(),
    hours: 0,
    minutes: 0,
    amPm: '',
    recurring: '',
    frequency: '',
    repeatNumber: 0,
    repeatType: '',
    repeatOn: [''],
    eventEnds: '',
    datePick: new Date(),
    ocurrences: 2,
    // step 3
    prefe:[''],
    prefeIds:[''],

    step: 1,
    progress:10,
  },
  setInputs: (inputs: Inputs) => set({ inputs }),
}));
