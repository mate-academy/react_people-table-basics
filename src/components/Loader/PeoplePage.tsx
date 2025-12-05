import React, { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsPeopleLoading(true);

    getPeople()
      .then(data =>
        data.map(person => ({
          ...person,
          slug: `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`,
        })),
      )
      .then(processed => setPeople(processed))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {people.length === 0 && !isPeopleLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
