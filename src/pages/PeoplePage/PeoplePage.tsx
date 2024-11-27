import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../../components/PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    return {
      ...person,
      father: people.find(f => f.name === person.fatherName),
      mother: people.find(m => m.name === person.motherName),
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { personSlug } = useParams<string>();

  const handleLoadPeople = () => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(p => setPeople(getPeopleWithParents(p)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleLoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : !!people.length ? (
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
                      key={person.slug}
                      className={cn({
                        'has-background-warning': personSlug === person.slug,
                      })}
                      data-cy="person"
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {!person.mother ? (
                          person.motherName || '-'
                        ) : (
                          <PersonLink person={person.mother} />
                        )}
                      </td>
                      <td>
                        {!person.father ? (
                          person.fatherName || '-'
                        ) : (
                          <PersonLink person={person.father} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
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
