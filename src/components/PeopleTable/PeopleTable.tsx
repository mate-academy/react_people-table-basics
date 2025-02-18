import React from 'react';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { Person } from '../../types';

interface PeopleTableProps {
  people: Person[] | null;
  isLoading: boolean;
  error: boolean;
  selectedPersonName: string | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  isLoading,
  error,
  selectedPersonName,
}) => {
  const getPerson = (data: Person[], name: string | null) => {
    if (!name) {
      return null;
    }

    const person = data.find(item => item.name === name);

    return person || null;
  };

  const renderPersonCell = (data: Person[], name: string) => {
    const person = getPerson(data, name);

    return person ? <PersonLink person={person} /> : name;
  };

  return (
    <>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people && people.length > 0 && (
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
                      data-cy="person"
                      className={classNames({
                        'has-background-warning':
                          selectedPersonName === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName
                          ? renderPersonCell(people, person.motherName)
                          : '-'}
                      </td>
                      <td>
                        {person.fatherName
                          ? renderPersonCell(people, person.fatherName)
                          : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
