import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const [errorNoPeople, setErrorNoPeople] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorLoading('');
    setErrorNoPeople('');

    getPeople()
      .then(data => {
        const enrichedPeople = data.map(person => {
          const mother = data.find(p => p.name === person.motherName);
          const father = data.find(p => p.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(enrichedPeople);

        if (enrichedPeople.length === 0) {
          setErrorNoPeople('There are no people on the server');
        }
      })
      .catch(() => {
        setErrorLoading('Something went wrong');
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
          {isLoading && <Loader />}

          {errorLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorLoading}
            </p>
          )}

          {errorNoPeople && people.length === 0 && (
            <p data-cy="noPeopleMessage">{errorNoPeople}</p>
          )}

          {!isLoading && !errorLoading && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
