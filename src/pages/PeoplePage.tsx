import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../components/PersonLink';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const { slug = '' } = useParams();
  const isSelected = (person: Person) => slug === `${person.slug}`;

  const handleResponse = (resp: Person[]) => {
    setIsLoading(false);
    if (isErrorResponse) {
      setIsErrorResponse(false);
    }

    setPeople(resp);
  };

  useEffect(() => {
    getPeople()
      .then((response) => handleResponse(response))
      .catch(() => setIsErrorResponse(true))
      .finally(() => setIsLoading(false));
  }, []);

  const foundParent = (name: string) => {
    return people?.find(person => person.name === name);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorResponse && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length && !isLoading && (
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
                {people?.map(person => (
                  <tr
                    data-cy="person"
                    className={classNames(
                      { 'has-background-warning': isSelected(person) },
                    )}
                    key={person.name}
                  >
                    <PersonLink hasParent={person} />
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {person.motherName ? (
                      <PersonLink
                        name={person.motherName}
                        hasParent={foundParent(person.motherName)}
                      />
                    ) : (
                      <td>-</td>
                    )}
                    {person.fatherName ? (
                      <PersonLink
                        name={person.fatherName}
                        hasParent={foundParent(person.fatherName)}
                      />
                    ) : (
                      <td>-</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!people?.length
          && !isLoading
          && !isErrorResponse
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
