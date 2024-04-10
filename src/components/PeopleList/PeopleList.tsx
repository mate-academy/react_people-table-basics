import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

enum ErrorMessages {
  SomethingWentWrong = 'Something went wrong',
  NoPeopleOnTheServer = 'There are no people on the server',
}

export const PeopleList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPeople = await getPeople();

        const preparedPeople = fetchedPeople.map(person => {
          const mother = person.motherName
            ? fetchedPeople.find(p => p.name === person.motherName) ?? null
            : null;

          const father = person.fatherName
            ? fetchedPeople.find(p => p.name === person.fatherName) ?? null
            : null;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(preparedPeople as Person[]);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadingAndError = !isLoading && isError;
  const shouldRenderTable = !isLoading && !isError && !!people.length;
  const noPeople = !isLoading && !people.length && !isError;

  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {loadingAndError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorMessages.SomethingWentWrong}
          </p>
        )}

        {shouldRenderTable && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {columns.map(columnName => (
                  <th key={columnName}>{columnName}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {people.map(person => {
                return <PersonItem person={person} key={person.slug} />;
              })}
            </tbody>
          </table>
        )}

        {noPeople && (
          <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleOnTheServer}</p>
        )}
      </div>
    </div>
  );
};
