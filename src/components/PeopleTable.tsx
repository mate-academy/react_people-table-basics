import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeopleTable = () => {
  const { personSlug } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState<boolean>(false);

  const peopleSuccessfulLoaded = !error && people.length > 0 && !isLoading;
  const noPeopleFound = !error && people.length === 0 && !isLoading;

  useEffect(() => {
    setIsLoading(true);
    getPeople().then((peopleFromServer) => {
      const peopleWithParents: Person[] = peopleFromServer.map(person => {
        const mother = peopleFromServer
          .find(p => p.name === person.motherName);
        const father = peopleFromServer
          .find(p => p.name === person.fatherName);

        return { ...person, mother, father };
      });

      setPeople(peopleWithParents);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading && <Loader />}
          { !isLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleFound && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {peopleSuccessfulLoaded && (
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
                    className={person.slug === personSlug
                      ? 'has-background-warning' : ''}
                  >
                    <td>
                      <NavLink to={`/people/${person.slug}`} className={person.sex === 'f' ? 'has-text-danger' : ''}>
                        {person.name}
                      </NavLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {person.mother
                      ? <td><NavLink to={`/people/${person.mother.slug}`} className="has-text-danger">{person.motherName}</NavLink></td>
                      : <td>{person.motherName ? person.motherName : '-'}</td>}

                    {person.father
                      ? <td><NavLink to={`/people/${person.father.slug}`}>{person.fatherName}</NavLink></td>
                      : <td>{person.fatherName ? person.fatherName : '-'}</td>}
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
