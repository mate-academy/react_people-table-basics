import React, { useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';

interface Props {
  people: Person[],
  isLoading: boolean,
  loadingError: boolean,
}

export const People: React.FC<Props> = ({
  people,
  isLoading,
  loadingError,
}) => {
  const [selectedName, setSelectedName] = useState('');

  const handleSelection
  = (event: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    event.preventDefault();

    setSelectedName(name);
  };

  const updatedPeople = people.map((child) => {
    if (child.motherName === null && child.fatherName === null) {
      return {
        ...child,
        motherName: '-',
        fatherName: '-',
      };
    }

    if (child.fatherName === null) {
      return {
        ...child,
        fatherName: '-',
      };
    }

    if (child.motherName === null) {
      return {
        ...child,
        motherName: '-',
      };
    }

    const father = people.find((parent) => parent.name === child.fatherName);
    const mother = people.find((parent) => parent.name === child.motherName);

    return {
      ...child,
      father,
      mother,
    };
  });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">

            {loadingError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <>
                {!isLoading ? (
                  <table
                    data-cy="peopleTable"
                    className="table
                     is-striped is-hoverable is-narrow is-fullwidth"
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
                    {people.length === 0 ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    ) : (
                      <tbody>
                        {updatedPeople.map((person) => {
                          return (

                            <tr
                              key={person.name}
                              className={selectedName === person.name
                                ? 'has-background-warning'
                                : ''}
                            >
                              <td>
                                <a
                                  href={person.slug}
                                  className={person.sex === 'f'
                                    ? ('has-text-danger')
                                    : ''}
                                  role="button"
                                  onClick={(event) => {
                                    handleSelection(event, person.name);
                                  }}
                                >
                                  {person.name}
                                </a>
                              </td>
                              <td>{person.sex}</td>
                              <td>{person.born}</td>
                              <td>{person.died}</td>
                              <td>
                                {person.mother
                                  ? (
                                    <a
                                      href={person.mother?.slug}
                                      className="has-text-danger"
                                    >
                                      {person.mother.name}
                                    </a>
                                  ) : (
                                    <p>
                                      {person.motherName}
                                    </p>
                                  )}
                              </td>
                              <td>
                                {person.father
                                  ? (
                                    <a
                                      href={person.father?.slug}
                                    >
                                      {person.father.name}
                                    </a>
                                  ) : (
                                    <p>
                                      {person.fatherName}
                                    </p>
                                  )}
                              </td>
                            </tr>

                          );
                        })}
                      </tbody>
                    )}
                  </table>
                ) : (
                  <Loader />
                )}
              </>

            )}
          </div>
        </div>
      </div>
    </main>
  );
};
