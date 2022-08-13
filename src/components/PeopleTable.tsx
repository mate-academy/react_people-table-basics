import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>();
  const params = useParams();
  const [noPeople, setNoPeople] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      if (peopleFromServer.length === 0) {
        setNoPeople(true);
      }

      const newPeople = peopleFromServer.map(person => {
        const newPerson = { ...person };
        const mother = peopleFromServer
          .find(person1 => person.motherName === person1.name);
        const father = peopleFromServer
          .find(person1 => person.fatherName === person1.name);

        if (mother) {
          newPerson.mother = mother;
        }

        if (father) {
          newPerson.father = father;
        }

        return newPerson;
      });

      setPeople(newPeople);
    })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {people && !isError && !noPeople ? (
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
                    className={classNames({
                      'has-background-warning': person.slug === params.slug,
                    })}
                  >
                    <td>
                      <NavLink
                        to={`/people/${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </NavLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <NavLink
                          to={`/people/${person.mother.slug}`}
                          className={classNames({
                            'has-text-danger': person.mother.sex === 'f',
                          })}
                        >
                          {person.motherName}
                        </NavLink>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <NavLink
                          to={`/people/${person.father.slug}`}
                          className={classNames({
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {person.fatherName}
                        </NavLink>
                      ) : (
                        person.fatherName || '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
          {noPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
