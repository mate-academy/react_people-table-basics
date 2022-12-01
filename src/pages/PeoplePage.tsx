import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { personSlug = '' } = useParams();

  useEffect(() => {
    const getPeopleData = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !people.length
        && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

      {isLoading
        ? <Loader />
        : (
          <PeopleTable
            people={people}
            personSlug={personSlug}
          />
        )}
    </>
  );
};
