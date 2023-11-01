import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import {
  LoadingErrorMessage,
} from '../components/LoadingErrorMessage/LoadingErrorMessage';
import { NoPeopleMessage } from '../components/NoPeopleMessage/NoPeopleMessage';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preparedPeople = (data: Person[]) => {
    const editedData = data.map(person => {
      let father;
      let mother;

      if (person.motherName) {
        mother = data.find(({ name }) => name === person.motherName);
      }

      if (person.fatherName) {
        father = data.find(({ name }) => name === person.fatherName);
      }

      return { ...person, mother, father };
    });

    setPeople(editedData);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(preparedPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {
            !!people?.length && (
              <PeopleTable
                people={people}
              />
            )
          }

          {
            isLoading && (
              <Loader />
            )
          }

          {
            !isLoading && !people?.length && (
              <NoPeopleMessage />
            )
          }

          {
            error && (
              <LoadingErrorMessage />
            )
          }
        </div>
      </div>
    </>
  );
};
