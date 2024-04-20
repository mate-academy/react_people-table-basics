import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  const findPerson = (personName: string) => {
    const person = people.find(person => person.name === personName);
    return person ? <PersonLink person={person} /> : personName;
  };

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

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0 && (
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
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': slug === person.slug,
                    })}
                    key={person.slug}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? findPerson(person.motherName) : '-'}
                    </td>
                    <td>
                      {person.fatherName ? findPerson(person.fatherName) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {people.length === 0 && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
