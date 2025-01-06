import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { personId } = useParams();
  const selectedPerson = personId;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(res => {
        setPeople(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const prepPeople = people.map(person => {
    const mother = people.find(
      somePerson => somePerson.name === person.motherName,
    );
    const father = people.find(
      somePerson => somePerson.name === person.fatherName,
    );

    return { ...person, mother, father };
  });

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

          {people.length === 0 && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && (
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
                {prepPeople.map(person => (
                  <tr
                    data-cy="person"
                    key={person.name}
                    className={classNames({
                      'has-background-warning': selectedPerson === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : (
                        <p>
                          {!person.motherName ? (
                            '-'
                          ) : (
                            <p>{person.motherName}</p>
                          )}
                        </p>
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : (
                        <p>
                          {!person.fatherName ? (
                            '-'
                          ) : (
                            <p>{person.fatherName}</p>
                          )}
                        </p>
                      )}
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
