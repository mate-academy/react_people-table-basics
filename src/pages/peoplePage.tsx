import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/peopleTable';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingSuccessful, setIsLoadingSuccessful] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setIsLoadingSuccessful(true);
      })
      .catch(() => {
        setIsLoadingSuccessful(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadingErrorMessage = (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );

  const emptyPeopleMessage = (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : isLoadingSuccessful ? (
            people.length > 0 ? (
              <PeopleTable people={people} />
            ) : (
              emptyPeopleMessage
            )
          ) : (
            loadingErrorMessage
          )}
        </div>
      </div>
    </>
  );
};
