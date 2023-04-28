import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams<string>();

  useEffect(() => {
    setIsLoading(true);

    const getPeopleFromServer = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleFromServer();
  }, []);

  const findParrent = (parrentName: string | null) => {
    return people.find(person => person.name === parrentName) || null;
  };

  const peopleWithParrents = people.map(person => {
    const personCopy = {
      ...person,
    };

    personCopy.father = findParrent(person.fatherName);
    personCopy.mother = findParrent(person.motherName);

    return personCopy;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? (
              <Loader />
            ) : (
              <PeopleTable
                people={peopleWithParrents}
                personId={slug}
              />
            )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
