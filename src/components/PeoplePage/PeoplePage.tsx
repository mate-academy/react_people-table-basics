import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isArrPeopleEmpty, setIsArrPeopleEmpty] = useState(false);

  const { personSlug = '' } = useParams();

  const getPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const result = await getPeople();

      if (result.length === 0) {
        setIsArrPeopleEmpty(true);
      }

      setPeople(result);
    } catch (err: unknown) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(people.length === 0 && isArrPeopleEmpty) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people.length > 0 && (
          <PeopleTable
            people={people}
            personSlug={personSlug}
          />
        )}

      </div>
    </>
  );
};
