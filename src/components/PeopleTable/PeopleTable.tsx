import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

interface PersonLinkProps {
  person: Person | undefined;
}

const PersonLink = ({ person }: PersonLinkProps) => {
  if (!person) {
    return <span></span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      end
      className={person.sex === 'f' ? 'has-text-danger' : ' '}
    >
      {person.name}
    </NavLink>
  );
};

export const PeopleTable = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [undefinedError, setUndefinedError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleArg => {
        setPeople(peopleArg);
      })
      .catch(() => {
        setUndefinedError(true);
        setTimeout(() => {
          setUndefinedError(false);
        }, 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const enrichedPeople = people.map(person => {
    return {
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
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
                {enrichedPeople.map(p => {
                  return (
                    <tr
                      key={p.slug}
                      data-cy="person"
                      className={
                        slug === p.slug ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <PersonLink person={p}></PersonLink>
                      </td>

                      <td>{p.sex}</td>
                      <td>{p.born}</td>
                      <td>{p.died}</td>
                      <td>
                        {p.motherName ? (
                          p.mother ? (
                            <PersonLink person={p.mother} />
                          ) : (
                            p.motherName
                          )
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {p.fatherName ? (
                          p.father ? (
                            <PersonLink person={p.father} />
                          ) : (
                            p.fatherName
                          )
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {undefinedError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!people.length && !loading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
