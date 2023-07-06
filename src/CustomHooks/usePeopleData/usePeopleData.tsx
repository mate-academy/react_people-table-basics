import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { TableList } from '../../components/TableList';
import { Loader } from '../../components/Loader';

interface UsePeopleDataResult {
  content: JSX.Element | null;
}

function sortPersons(persons: Person[]) {
  const valuePersons = [...persons];

  return valuePersons
    .map(person => {
      return {
        ...person,
        mother: valuePersons.find(mom => mom.name === person.motherName),
        father: valuePersons.find(dad => dad.name === person.fatherName),
      };
    });
}

export const usePeopleData = (): UsePeopleDataResult => {
  const [dataPerosn, setDataPerson] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setDataPerson(sortPersons(loadedPeople));
      } catch {
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <Loader />;
  } else if (loadError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (dataPerosn.length) {
    content = <TableList persons={dataPerosn} />;
  } else {
    content = (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return { content };
};
