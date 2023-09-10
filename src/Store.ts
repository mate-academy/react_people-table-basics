import { create } from 'zustand';
import { Person } from './types';

interface State {
  people: Person[] | null,
  setPeople: (arg: Person[]) => void,
}

export const peopleStore = create<State>((set) => ({
  people: null,
  setPeople:
  (arg: Person[]) => set((state: State) => ({ ...state, people: arg })),
}));
