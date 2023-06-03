import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const Table: FC = () => {
  const { personSlug = '' } = useParams();
  const [persons, setPersons] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(result => {
        setLoader(false);
        setPersons(result);
      })
      .catch(() => {
        setLoader(false);
        setError(true);
      });
  }, []);

  return (
    <>
      {loader ? (<Loader />) : (
        <div className="block">
          {!error ? (
            <div className="box table-container">
              {persons.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="
                  table is-striped is-hoverable is-narrow is-fullwidth"
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
                    {persons.map(person => (
                      <PersonRow
                        person={person}
                        persons={persons}
                        key={person.slug}
                        personSlug={personSlug}
                      />
                    ))}
                  </tbody>
                </table>
              ) }
            </div>
          ) : (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      )}
    </>
  );
};
