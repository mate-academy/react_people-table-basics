import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonElement } from './PersonElement';

interface Props {
  people: Person[],
  isLoading: boolean,
  loadingError: boolean,
  personSlug: string | undefined,
  handleSelection: (slug: string,) => void,
}

export const People: React.FC<Props> = ({
  people,
  isLoading,
  loadingError,
  handleSelection,
  personSlug,
}) => {
  const updatedPeople = people.map((child) => {
    if (!child.motherName && !child.fatherName) {
      return {
        ...child,
        motherName: '-',
        fatherName: '-',
      };
    }

    if (!child.fatherName) {
      return {
        ...child,
        fatherName: '-',
      };
    }

    if (!child.motherName) {
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
                            <PersonElement
                              key={person.slug}
                              person={person}
                              handleSelection={handleSelection}
                              personSlug={personSlug}
                            />
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
