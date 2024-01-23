import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { getPeople } from '../api/people';

import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

import { Person } from '../types/Person';
import { Error } from '../types/Error';

export const PeopleTable: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | ''>('');

  const hasError = useMemo(() => (
    !isLoading && error
  ), [isLoading, error]);

  const hasNoPeople = useMemo(() => (
    !people.length && !isLoading && !error
  ), [people, isLoading, error]);

  const hasPeople = useMemo(() => (
    !!people.length && !isLoading
  ), [people, isLoading]);

  const handleGetPeopleError = useCallback(() => {
    setError(Error.PeopleLoading);
    setTimeout(() => {
      setError('');
    }, 1000);
  }, []);

  const normalizePeople = useCallback((peopleToNormalize: Person[]) => (
    peopleToNormalize.map(person => {
      const normalizedPerson = { ...person };

      const checkName = (name: string | null) => name || '-';

      const findParent = (parentName: string) => (
        peopleToNormalize.find(personToNormalize => (
          personToNormalize.name === parentName
        ))
      );

      normalizedPerson.motherName = checkName(normalizedPerson.motherName);
      normalizedPerson.fatherName = checkName(normalizedPerson.fatherName);

      normalizedPerson.mother = findParent(normalizedPerson.motherName);
      normalizedPerson.father = findParent(normalizedPerson.fatherName);

      return normalizedPerson;
    })
  ), []);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        setPeople(normalizePeople(peopleFromServer));
      })
      .catch(handleGetPeopleError)
      .finally(() => setIsLoading(false));
  }, [normalizePeople, handleGetPeopleError]);

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {hasNoPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {hasPeople && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <PersonLink person={person} />

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  <td>{person.motherName}</td>
                )}

                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  <td>{person.fatherName}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
