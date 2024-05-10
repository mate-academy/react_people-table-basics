import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';

interface PeopleContextI {
  people: Person[];
  activePerson?: Person;
  error: boolean;
  pending: boolean;
}

const PeopleContext = createContext<PeopleContextI>({
  people: [],
  error: false,
  pending: false,
});

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setPending(true);
    getPeople()
      .then(data => {
        const mapped = data.reduce<{ [key: string]: Person }>(
          (prev, curr) => ({
            ...prev,
            [curr.name]: curr,
          }),
          {},
        );

        setPeople(
          data.map(d => ({
            ...d,
            mother: d.motherName ? mapped[d.motherName] : undefined,
            father: d.fatherName ? mapped[d.fatherName] : undefined,
          })),
        );
      })
      .catch(() => setError(true))
      .finally(() => setPending(false));
  }, []);

  const activePerson = useMemo(
    () => people.find(p => p.slug === slug),
    [slug, people],
  );

  const value = {
    people,
    activePerson,
    error,
    pending,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);
