import React from 'react';
import { useQuery } from 'react-query';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const {
    data: people, isLoading, isError,
  } = useQuery<Person[]>('people', getPeople);

  const preparedPeople: Person[] = people?.map(person => {
    const mother = people.find(m => m.name === person.motherName);
    const father = people.find(f => f.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  }) || [];

  const isErrorVisible = !isLoading && isError;
  const isEmptyPeopleTable = !isLoading && !isError && !people?.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErrorVisible && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmptyPeopleTable && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isEmptyPeopleTable && (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
