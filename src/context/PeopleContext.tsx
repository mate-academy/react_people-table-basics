import {
  Dispatch, createContext, useState, SetStateAction,
} from 'react';
import { PersonTypes } from '../types';

type Props = {
  children: React.ReactNode
};

type PeopleContextType = {
  people: PersonTypes[];
  setPeople: Dispatch<SetStateAction<PersonTypes[]>>;
  selectedPerson: null | PersonTypes,
  setSelectedPerson: Dispatch<SetStateAction<PersonTypes | null>>
};

export const PeopleContext
  = createContext<PeopleContextType>({
    people: [],
    setPeople: () => {},
    selectedPerson: null,
    setSelectedPerson: () => {},
  });

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<PersonTypes[] | []>([]);
  const [selectedPerson, setSelectedPerson]
    = useState<null | PersonTypes>(null);

  const value = {
    people,
    setPeople,
    selectedPerson,
    setSelectedPerson,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
