import React, { useMemo, useState } from 'react';
import { Person } from '../types';

type PeopleContextProps = {
  people: Person[];
  setPeople: (prevState: Person[]) => void;
  peopleLoader: boolean;
  setPeopleLoader: (prevState: boolean) => void;
  selectedPersonDates: string;
  setSelectedPersonDates: (prevState: string) => void;
};

export const PeopleContext = React.createContext<PeopleContextProps>({
  people: [],
  setPeople: () => {},
  peopleLoader: false,
  setPeopleLoader: () => {},
  selectedPersonDates: '',
  setSelectedPersonDates: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoader, setPeopleLoader] = useState<boolean>(false);
  const [selectedPersonDates, setSelectedPersonDates] = useState<string>('');

  const value = useMemo(
    () => ({
      people,
      peopleLoader,
      setPeople,
      setPeopleLoader,
      selectedPersonDates,
      setSelectedPersonDates,
    }),
    [
      people,
      peopleLoader,
      setPeople,
      setPeopleLoader,
      selectedPersonDates,
      setSelectedPersonDates,
    ],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
