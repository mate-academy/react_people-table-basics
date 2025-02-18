import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(() => {
    function getFather(fatherName: string | null) {
      return people.find(person => fatherName === person.name) || null;
    }

    function getMother(motherName: string | null) {
      return people.find(person => motherName === person.name) || null;
    }

    return people.map(person => ({
      ...person,
      father: getFather(person.fatherName),
      mother: getMother(person.motherName),
    }));
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading &&
            (!people.length ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={peopleWithParents} />
            ))}
        </div>
      </div>
    </>
  );
};
