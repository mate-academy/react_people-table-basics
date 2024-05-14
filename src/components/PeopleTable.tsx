import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

interface Props {
  setLoading: (setLoading: boolean) => void;
  loading: boolean;
}

export const PeopleTable: React.FC<Props> = ({ setLoading, loading }) => {
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

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
            {users.map(person => (
              <tr data-cy="person" key={person.name}>
                <td>
                  <a
                    className={person.sex === 'female' ? 'has-text-danger' : ''}
                    href={`#/people/${person.name.toLowerCase().trim()}`}
                  >
                    {person.name.trim()}
                  </a>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person && person.motherName ? (
                    <PersonLink
                      person={{
                        slug: person.mother?.slug ?? '',
                        name: person.motherName,
                      }}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person && person.fatherName ? (
                    <PersonLink
                      person={{
                        slug: person.father?.slug ?? '',
                        name: person.fatherName,
                      }}
                    />
                  ) : (
                    '-'
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
