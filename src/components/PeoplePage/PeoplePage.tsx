import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const isNoPeople = people.length === 0 && !errors && !isLoading;
  const isVisibleTable = !isLoading && !!people.length;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            parent => parent.name === person.motherName,
          );
          const father = peopleFromServer.find(
            parent => parent.name === person.fatherName,
          );

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setErrors('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && !errors && <Loader />}

          {errors && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errors}
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isVisibleTable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
