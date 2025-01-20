import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Person } from '../types';

import { getPeople } from '../api';

import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug);

  useEffect(() => {
    getPeople()
      .then(loadedPeople => {
        const dict = loadedPeople.reduce<{ [key: string]: Person }>(
          (prev, person) => {
            // eslint-disable-next-line no-param-reassign
            prev[person.name] = person;

            return prev;
          },
          {},
        );

        setPeople(
          loadedPeople.map(person => {
            return {
              ...person,
              father: person.fatherName ? dict[person.fatherName] : undefined,
              mother: person.motherName ? dict[person.motherName] : undefined,
            };
          }),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isContentVisible = !isLoading && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isContentVisible && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {isContentVisible && people.length !== 0 && (
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
                  className={classNames({
                    'has-background-warning':
                      person.slug === selectedPerson?.slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {person.mother && <PersonLink person={person.mother} />}
                    {!person.mother && (person.motherName || '-')}
                  </td>

                  <td>
                    {person.father && <PersonLink person={person.father} />}
                    {!person.father && (person.fatherName || '-')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
