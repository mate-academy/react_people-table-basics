import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { Link } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const people = useMemo(
    () =>
      users.map(user => ({
        ...user,
        mother: users.find(u => u.name === user.motherName),
        father: users.find(u => u.name === user.fatherName),
      })),
    [users],
  );

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const data = await getPeople();

        setUsers(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        setError('Error');
      }
    };

    fetchPersons();
  }, [setLoading]);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (users.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="block">
      <div className="box table-container">
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
              <tr data-cy="person" key={person.name}>
                <td>
                  <Link
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                    to={`/people/${person.slug}`}
                  >
                    {person.name.trim()}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person && person.mother ? (
                    <PersonLink person={person?.mother} />
                  ) : (
                    person.motherName ?? '-'
                  )}
                </td>
                <td>
                  {person && person.father ? (
                    <PersonLink person={person?.father} />
                  ) : (
                    person.fatherName ?? '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
