/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getPeople()
      .then(peopleFromServer => setPeopleFromServer(peopleFromServer))
      .catch(() => setError('Error loading people from the server'))
      .finally(() => setLoading(false));
  }, []);

  const linkParents = (people: Person[]): Person[] => {
    return people.map(person => ({
      ...person,
      mother: people.find(p => p.name === person.motherName) || undefined,
      father: people.find(p => p.name === person.fatherName) || undefined,
    }));
  };

  return (
    <>
      <h1 className="title">People Page</h1>

       <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!error && peopleFromServer.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && peopleFromServer.length > 0 && (
                <PeopleTable people={linkParents(peopleFromServer)} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
