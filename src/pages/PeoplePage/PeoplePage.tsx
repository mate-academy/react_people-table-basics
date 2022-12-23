import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';
import { getPeople } from '../../api/api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { selectedSlug = '' } = useParams();

  const isNoPeople = !people.length && !isLoading && !hasError;
  const isPeople = !!people.length && !isLoading;

  const getUser = (name: string | null, peopleFromServer: Person[]) => {
    const foundUser = peopleFromServer.find((person) => person.name === name);

    return foundUser;
  };

  const updatePeople = (individuals: Person[]) => (
    individuals.map((person) => ({
      ...person,
      father: getUser(person.fatherName, individuals),
      mother: getUser(person.motherName, individuals),
    }))
  );

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      setPeople(updatePeople(response));
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeople && (
            <PeopleTable
              people={people}
              selectedSlug={selectedSlug}
            />
          )}
        </div>
      </div>
    </>
  );
});
