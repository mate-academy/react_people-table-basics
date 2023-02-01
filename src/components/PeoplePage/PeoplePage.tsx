import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: React.FC = memo(() => {
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const { slug } = useParams();

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      const preparedPeople = loadedPeople.map(person => {
        const mother = loadedPeople.find(mom => (
          mom.name === person.motherName));
        const father = loadedPeople.find(dad => (
          dad.name === person.fatherName));

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(preparedPeople);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingFinish(true);
    }
  };

  useEffect(() => {
    setIsError(false);
    setIsLoadingFinish(false);
    loadPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoadingFinish && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
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
                {people.map((person) => (
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
    </div>
  );
});
