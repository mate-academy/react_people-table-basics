import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const readyPeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {readyPeople.length < 1 && !loading && (
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
                {readyPeople.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames('', {
                      'has-background-warning':
                        selectedPerson?.slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother && person.mother.slug ? (
                        <Link
                          to={`/people/${person.mother.slug}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <Link to={`/people/${person.father.slug}`}>
                          {person.fatherName}
                        </Link>
                      ) : (
                        person.fatherName || '-'
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
