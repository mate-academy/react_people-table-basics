import { FC, useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { useParams } from 'react-router-dom';
import { PersonInfo } from '../PersonInfo';

function getPeopleWithParents(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      father: people.find(pa => pa.name === person.fatherName),
      mother: people.find(ma => ma.name === person.motherName),
    };
  });
}

export const PeopleList: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { personSlug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(humans => {
        setPeople(getPeopleWithParents(humans));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : !!people.length ? (
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
                  <PersonInfo
                    person={person}
                    personSlug={personSlug}
                    key={person.slug}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <>
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
