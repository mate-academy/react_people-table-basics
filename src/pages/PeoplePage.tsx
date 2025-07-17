import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {!loading && error && (
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
                {people.map(person => {
                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={
                        slug === person.slug ? 'has-background-warning' : ''
                      }
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
