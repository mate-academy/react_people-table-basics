import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonLink } from './PeopleLink';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const preparedPeople = people.map((user) => {
    const newUser = { ...user };

    newUser.mother = people.find((person) => person.name === user.motherName);
    newUser.father = people.find((person) => person.name === user.fatherName);

    return newUser;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {people.length > 0 && error === false && (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
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
                    {preparedPeople.map(person => (
                      <tr
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': slug === person.slug,
                        })}
                        // key={person.slug}
                      >
                        <td>
                          <PersonLink
                            person={person}
                            personName={person.name}
                          />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          <PersonLink
                            person={person.mother}
                            personName={person.motherName}
                          />
                        </td>
                        <td>
                          <PersonLink
                            person={person.father}
                            personName={person.fatherName}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && (
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
