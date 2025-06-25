import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader/index';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const { person } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPeople = async () => {
    try {
      const data = await getPeople();

      setPeople(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchPeople();
  }, [person]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !error && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!error && !loading && people.length > 0 && (
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
                {people.map(human => (
                  <tr
                    key={human.slug}
                    data-cy="person"
                    className={
                      person === human.slug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <Link
                        to={`/people/${human.slug}`}
                        className={human.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {human.name}
                      </Link>
                    </td>

                    <td>{human.sex}</td>
                    <td>{human.born}</td>
                    <td>{human.died}</td>

                    <td>
                      <PersonLink
                        personName={human.motherName}
                        people={people}
                      />
                    </td>

                    <td>
                      <PersonLink
                        personName={human.fatherName}
                        people={people}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
