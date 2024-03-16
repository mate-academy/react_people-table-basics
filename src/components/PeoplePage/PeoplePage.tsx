import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const { slug } = useParams();
  const selectedPerson = slug ? `${slug}` : '';

  useEffect(() => {
    setError(false);
    setDataFetched(false);

    getPeople()
      .then(response => {
        setPeople(response);
        setDataFetched(true);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!dataFetched && !error && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {dataFetched && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                  <PersonLink
                    key={person.slug}
                    person={person}
                    people={people}
                    selectedPerson={selectedPerson}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
