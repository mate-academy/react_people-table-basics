import { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleContext } from '../../store/PeopleContext';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const PeopleTable = () => {
  const { isLoading, isError, isPeople, people } = useContext(PeopleContext);
  const { pathname } = useLocation();

  return (
    <div className="box table-container">
      {isError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : isLoading ? (
        <Loader />
      ) : !isPeople ? (
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
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': pathname.endsWith(person.slug),
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    people.find(p => p.name === person.motherName) ? (
                      <PersonLink
                        person={people.find(p => p.name === person.motherName)!}
                      />
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    people.find(p => p.name === person.fatherName) ? (
                      <PersonLink
                        person={people.find(p => p.name === person.fatherName)!}
                      />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
