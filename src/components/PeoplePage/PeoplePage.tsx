import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();
  const activeSlug = people.find(
    (person: Person) => person.slug === slug,
  )?.slug;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const findMother = (child: Person) => {
    return people.find((person: Person) => child.motherName === person.name);
  };

  const findFather = (child: Person) => {
    return people.find((person: Person) => child.fatherName === person.name);
  };

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
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
              {people.map(person => {
                const mother = findMother(person);
                const father = findFather(person);

                return (
                  <tr
                    data-cy="person"
                    key={person.name}
                    className={classNames({
                      'has-background-warning': person.slug === activeSlug,
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
                      {mother ? (
                        <NavLink
                          className="has-text-danger"
                          to={`/people/${mother.slug}`}
                        >
                          {person.motherName}
                        </NavLink>
                      ) : person.motherName ? (
                        person.motherName
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {father ? (
                        <NavLink to={`/people/${father.slug}`}>
                          {person.fatherName}
                        </NavLink>
                      ) : person.fatherName ? (
                        person.fatherName
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
  );
};
