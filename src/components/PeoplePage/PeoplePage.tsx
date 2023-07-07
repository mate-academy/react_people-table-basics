import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {people && <PeopleTable people={people} />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
