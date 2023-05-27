import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { personSlug = '0' } = useParams();

  const fetchPeople = useCallback(async () => {
    try {
      setPeople(await getPeople());
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPeople();
  }, []);

  const peopleWithFamilySlug = useMemo(() => people.map(child => {
    const mother = people
      .find(motherPerson => motherPerson.name === child.motherName);
    const father = people
      .find(fatherPerson => fatherPerson.name === child.fatherName);

    return {
      ...child,
      mother,
      father,
    };
  }), [people]);

  if (isLoading) {
    return (<Loader />);
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (peopleWithFamilySlug.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <PeopleTable
      people={peopleWithFamilySlug}
      selectedPersonSlug={personSlug}
    />
  );
};
