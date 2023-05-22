import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { getPeople } from '../api';
import { Loader } from './Loader';

interface Props {
  setIsLoadingError: (arg: boolean) => void;
}

export const PeopleTable: React.FC<Props> = ({ setIsLoadingError }) => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setIsLoadingError(true);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, [getPeopleFromServer]);

  const parent = (parentName: string) => {
    return people.find(person => person.name === parentName);
  };

  return (
    <>
      {people.length < 1 && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {!people ? (
        <Loader />
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
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

          <tbody>
            {people.map(person => (
              <PersonItem
                person={person}
                key={person.slug}
                parent={parent}
                selectedPerson={slug}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
