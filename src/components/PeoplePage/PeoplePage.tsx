import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    return people.map((person, _, array) => {
      const personMother = array
        .find(mother => mother.name === person.motherName) || null;
      const personFather = array
        .find(father => father.name === person.fatherName) || null;

      return {
        ...person,
        mother: personMother,
        father: personFather,
      };
    });
  }, [people]);

  return (
    <div className="block">
      <div className="box table-container">
        {(isLoading && people.length === 0)
          && (<Loader />)}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!isLoading && people.length === 0)
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        {(!isLoading && people.length > 0)
          && <PeopleTable people={preparedPeople} />}
      </div>
    </div>
  );
};
