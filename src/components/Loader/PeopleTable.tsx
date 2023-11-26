import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PersoLink } from './PersonLink';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPeople = async () => {
    setLoading(true);
    setError(false);

    try {
      const peopleFormServer = await getPeople();
      const childrenWithParents = peopleFormServer.map(person => ({
        ...person,
        father: peopleFormServer
          .find(father => father.name === person.fatherName),
        mother: peopleFormServer
          .find(mother => mother.name === person.motherName),
      }));

      setPeople(childrenWithParents);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const noPeopleOnServer = !people.length && !error && !loading;

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {noPeopleOnServer && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!!people.length && (
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
                <PersoLink
                  key={person.slug}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
