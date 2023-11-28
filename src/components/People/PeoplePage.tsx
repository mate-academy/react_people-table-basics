import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  const showLoader = people === null && !isError;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true));
  }, []);

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {showLoader && <Loader />}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && people.length > 0 && (
            <PeopleTable people={people} clickedPersonSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
