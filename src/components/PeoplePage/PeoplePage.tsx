import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();

  const loadedPeople = async () => {
    setIsLoading(true);

    try {
      const loadPeople = await getPeople();

      const peopleWithParents = loadPeople.map(person => {
        const father = loadPeople.find(f => f.name === person.fatherName);
        const mother = loadPeople.find(m => m.name === person.motherName);

        return (
          {
            ...person,
            father,
            mother,
          }
        );
      });

      setPeople(peopleWithParents);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { id: 1, fieldName: 'Name' },
    { id: 2, fieldName: 'Sex' },
    { id: 3, fieldName: 'Born' },
    { id: 4, fieldName: 'Died' },
    { id: 5, fieldName: 'Mother' },
    { id: 6, fieldName: 'Father' },
  ];

  useEffect(() => {
    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {fields.map(field => (
                    <th>{field.fieldName}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    <td>
                      {person.mother
                        ? <PersonLink person={person.mother} />
                        : person.motherName || '-'}
                    </td>
                    <td>
                      {person.father
                        ? <PersonLink person={person.father} />
                        : person.fatherName || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
});
