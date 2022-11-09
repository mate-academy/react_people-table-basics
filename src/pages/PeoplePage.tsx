import {
  useState,
  useEffect,
  useMemo,
} from 'react';

import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

const NoPeople = () => (
  <p data-cy="noPeopleMessage">
    There are no people on the server
  </p>
);

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { slug = '' } = useParams();

  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error: any) {
      setErrorMessage('Something went wrong');
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const findParent = useMemo(() => (
    (parentName: string | null): Person | null => {
      return people.find(person => person.name === parentName) || null;
    }
  ), [people]);

  const getFullPersonInfo = () => {
    return people.map(person => ({
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    }));
  };

  const modifiedPeople = useMemo(() => (
    getFullPersonInfo()
  ), [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {modifiedPeople.length === 0
            ? (
              isLoading || (!errorMessage && <NoPeople />)
            )
            : (
              <PeopleTable
                people={modifiedPeople}
                selectedPerson={slug}
              />
            )}
        </div>
      </div>
    </>
  );
};
