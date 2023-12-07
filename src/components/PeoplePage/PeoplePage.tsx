import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSpinnerShown, setIsSpinnerShown] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const isErrorMessageShown = errorMessage && !isSpinnerShown;
  const isPeopleListEmpty = !people.length && !errorMessage && !isSpinnerShown;

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then<Person[]>(response => response.json())
      .then(value => {
        const peopleWithParents = value.map(person => {
          const newPerson = { ...person };

          if (newPerson.motherName) {
            newPerson.mother = value.find(p => p.name === newPerson.motherName);
          }

          if (newPerson.fatherName) {
            newPerson.father = value.find(p => p.name === newPerson.fatherName);
          }

          return newPerson;
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setErrorMessage('Error');
      })
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isSpinnerShown && (
            <Loader />
          )}

          {isErrorMessageShown && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleListEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isSpinnerShown && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
