import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { ErrorTypes } from '../types/ErrorTypes';
import { Outlet, useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(ErrorTypes.SOMETHING_WENT_WRONG);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const findPersonByName = (name: string) =>
    people.find(person => person.name === name);

  const isHighlighted = (personSlug: string) => personSlug === slug;

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorTypes.SOMETHING_WENT_WRONG}
          </p>
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage">{ErrorTypes.NO_PEOPLE_ON_SERVER}</p>
        ) : (
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
                  data-cy="person"
                  key={person.slug}
                  className={
                    isHighlighted(person.slug) ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} people={people} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      findPersonByName(person.motherName) ? (
                        <PersonLink person={findPersonByName(person.motherName)!} />
                      ) : (
                        person.motherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>

                  <td>
                    {person.fatherName ? (
                      findPersonByName(person.fatherName) ? (
                        <PersonLink person={findPersonByName(person.fatherName)!} />
                      ) : (
                        person.fatherName
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Outlet />
    </div>
  );
};
