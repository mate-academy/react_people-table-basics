import { create } from 'zustand';
import { Person } from './types';

interface State {
  people: Person[],
  setPeople: (arg: Person[]) => void,
}

export const peopleStore = create<State>((set) => ({
  people: [],
  setPeople:
  (arg: Person[]) => set((state: State) => ({ ...state, people: arg })),
}));
