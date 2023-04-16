import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug = '' } = useParams();
  const havePeople = people.length > 0;

  const loadPeople = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch {
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>;
      } finally {
        setIsLoading(false);
      }
    }, [getPeople],
  );

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {!havePeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable
              people={people}
              selectedPerson={personSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
