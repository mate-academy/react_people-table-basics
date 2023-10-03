import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
    }).catch((error) => {
      setIsError(error);
    });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {(!people) && (<Loader />)}

            {(isError) && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {(people?.length === 0) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {people && (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
