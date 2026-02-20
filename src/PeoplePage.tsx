import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './components/Loader';
import { PersonLink } from './PersonLink';
import { Person } from './types';
import { getPeople } from './api';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 && (
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
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <td>
                    <PersonLink name={person.name} people={people} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    <PersonLink name={person.motherName} people={people} />
                  </td>
                  <td>
                    <PersonLink name={person.fatherName} people={people} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
