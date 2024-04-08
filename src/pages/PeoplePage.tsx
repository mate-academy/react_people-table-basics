import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PersonType } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';


export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function loadPeople() {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
