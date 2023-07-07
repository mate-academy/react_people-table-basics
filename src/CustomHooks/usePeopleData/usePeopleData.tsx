import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { TableList } from '../../components/TableList';
import { Loader } from '../../components/Loader';

interface UsePeopleDataResult {
  content: JSX.Element;
}

function sortPersons(persons: Person[]) {
  return persons.map(person => ({
    ...person,
    mother: persons.find(mom => mom.name === person.motherName),
    father: persons.find(dad => dad.name === person.fatherName),
  }));
}

export const usePeopleData = (): UsePeopleDataResult => {
  const [dataPersons, setDataPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setDataPersons(sortPersons(loadedPeople));
      } catch {
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const content: JSX.Element = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (loadError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (dataPersons.length) {
      return <TableList persons={dataPersons} />;
    }

    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }, [isLoading, loadError, dataPersons.length]);

  return { content };
};
