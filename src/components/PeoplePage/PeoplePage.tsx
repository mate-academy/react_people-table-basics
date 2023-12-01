import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPeopleLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setPeopleLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {peopleLoading && <Loader /> }

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleLoading === false && !error && (people.length === 0
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : <PeopleTable people={people} />)}
        </div>
      </div>
    </>
  );
};
