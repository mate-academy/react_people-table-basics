import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const selectedPersonName = slug ? slug : 0;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getPerson = (data: Person[], name: string | null) => {
    if (!name) {
      return null;
    }

    const person = data.find(item => item.name === name);

    return person || null;
  };

  const renderPersonCell = (data: Person[], name: string) => {
    const person = getPerson(data, name);

    return person ? <PersonLink person={person} /> : name;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people && people.length > 0 && (
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
                {people.map(person => {
                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning':
                          selectedPersonName === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName
                          ? renderPersonCell(people, person.motherName)
                          : '-'}
                      </td>
                      <td>
                        {person.fatherName
                          ? renderPersonCell(people, person.fatherName)
                          : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
