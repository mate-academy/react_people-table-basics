import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
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
};
