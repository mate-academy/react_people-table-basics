import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { WrongMessage } from '../WrongMessage';
import { NoPeopleMessage } from '../NoPeopleMessage';
import { PersonLink } from '../PersonLink';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => SetError(true))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <WrongMessage />
  ) : people.length === 0 ? (
    <NoPeopleMessage />
  ) : (
    <>
      <h1 className="title">People Page</h1>

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
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink name={person.motherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink name={person.fatherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
