import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { Loader } from './Loader';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  people: Person[];
  loading: boolean;
  loadingError: boolean;
};

export const PeopleTable: React.FC<Props> = props => {
  const { people, loading, loadingError } = props;

  const location = useLocation();

  return (
    <div className="block">
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : loadingError ? (
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
                const isActive = location.pathname === `/people/${person.slug}`;

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': isActive,
                    })}
                  >
                    <td>
                      <NavLink
                        className={cn({
                          'has-text-danger': person.sex === 'f',
                        })}
                        to={`/people/${person.slug}`}
                      >
                        {person.name}
                      </NavLink>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {people.some(p => p.name === person.motherName) ? (
                        <NavLink
                          className="has-text-danger"
                          to={`/people/${people.find(p => p.name === person.motherName)?.slug}`}
                        >
                          {person.motherName}
                        </NavLink>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td>
                      {people.some(p => p.name === person.fatherName) ? (
                        <NavLink
                          to={`/people/${people.find(p => p.name === person.fatherName)?.slug}`}
                        >
                          {person.fatherName}
                        </NavLink>
                      ) : (
                        person.fatherName || '-'
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
