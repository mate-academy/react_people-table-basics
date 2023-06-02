import React, { useEffect } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonElement } from './PersonElement';

interface Props {
  people: Person[],
  isLoading: boolean,
  loadingError: boolean,
  setSelectedPerson: (value: string) => void,
  selectedName: string | undefined,
  setSelectedName: (value: string | undefined) => void,
}

export const People: React.FC<Props> = ({
  people,
  isLoading,
  loadingError,
  setSelectedPerson,
  setSelectedName,
  selectedName,
}) => {
  const handleSelection = (
    name: string | undefined,
    slug: string,
  ) => {
    localStorage.setItem('selectedPersonSlug', slug);
    setSelectedName(name);
    setSelectedPerson(slug);
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

  useEffect(() => {
    const selectedPersonSlug = localStorage.getItem('selectedPersonSlug');
    const selectedNewPerson
     = people.find((person) => person.slug === selectedPersonSlug);

    setSelectedName(selectedNewPerson ? selectedNewPerson?.name : '');
  }, [people]);

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
                              person={person}
                              handleSelection={handleSelection}
                              selectedName={selectedName}
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
