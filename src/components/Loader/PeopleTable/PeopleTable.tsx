import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { ListOfPeople } from './ListOfPeople';
import { getPeople } from '../../../api';
import { Person } from '../../../types';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setPeople([]);
    };
  }, []);

  const preparedPeople = people.map(person => {
    const newPerson = { ...person };

    const mother = people.find(mom => person.motherName === mom.name);
    const father = people.find(dad => person.fatherName === dad.name);

    newPerson.mother = mother;
    newPerson.father = father;

    return newPerson;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {preparedPeople.length > 0 && (
            <ListOfPeople people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
