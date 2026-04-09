import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../utils/Actions';
import { PeopleTable } from '../../components/PeopleTable';

function prepearPeople(people: Person[]) {
  return people.map(person => {
    let prepearedPerson = { ...person };
    const mother = people.find(
      personMother => person.motherName === personMother.name,
    );
    const father = people.find(
      personFather => person.fatherName === personFather.name,
    );

    if (mother) {
      prepearedPerson = { ...prepearedPerson, mother: mother };
    }

    if (father) {
      prepearedPerson = { ...prepearedPerson, father: father };
    }

    return prepearedPerson;
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        const prepearedPeople = prepearPeople(response);

        setPeople(prepearedPeople);
      })
      .catch(() => {
        setPeople([]);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people.length > 0 && !isLoading && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
