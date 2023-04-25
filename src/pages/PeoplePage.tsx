import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { personSlug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && !isLoading && !people.length
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {!people.length && !isError && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && !isLoading && !isError
            && (
              <PeopleTable
                people={people}
                personSlug={personSlug}
              />
            )}
        </div>
      </div>
    </>
  );
};
