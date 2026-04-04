import React from 'react';
import { PersonLink } from '../personlink/personlink';
import classNames from 'classnames';
import { Loader } from '../Loader';
import {  Person, TableProps } from '../../types';


export const PeopleTable: React.FC<TableProps> = ({ person, errorMessage, isLoading, serveAlone, selectedUser }) => {
  const peoples: Record<string, Person> = {}
  person.forEach((p) => peoples[p.name] = p )

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {person.length === 0 && serveAlone && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {serveAlone && (
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
            <tbody >
            {person.map(p => {
              const mother = peoples[p.motherName || ''];
              const father = peoples[p.fatherName || ''];

              return (
                  <tr key={p.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': selectedUser === p.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={p} />
                    </td>
                    <td>{p.sex}</td>
                    <td>{p.born}</td>
                    <td>{p.died}</td>
                    <td>
                      <PersonLink person={mother} name={p.motherName} />
                    </td>

                    <td>
                      <PersonLink person={father} name={p.fatherName} />
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
