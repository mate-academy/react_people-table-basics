import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const { personSlug = '' } = useParams();
  const [people, setPeople] = useState<Person []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo<Person []>(() => (
    people.map((person, _, arr) => (
      {
        ...person,
        mother: arr.find(maybeMother => maybeMother.name === person.motherName),
        father: arr.find(maybeFather => maybeFather.name === person.fatherName),
      }
    ))
  ), [people]);

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

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <PeopleTable
              people={peopleWithParents}
              selectedPersonSlug={personSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
