import { useEffect, useState } from 'react';
import { fetchPeople } from '../utils/fetchPeople';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';

const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPeople(BASE_URL)
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading
            ? <Loader />
            : (
              <>
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {people.length
                  ? <PeopleTable people={people} />
                  : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
