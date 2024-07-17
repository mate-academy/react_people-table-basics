import { v4 as uuidv4 } from 'uuid';
import { Person } from '../types';
import { FC } from 'react';
import React from 'react';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  persons: Person[];
};

export const PeopleTable: FC<Props> = ({ persons }) => {
  const { slug } = useParams();

  return (
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
        {persons.map(person => (
          <tr
            key={uuidv4()}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
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
                persons.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={persons.find(p => p.name === person.motherName)}
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
                persons.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={persons.find(p => p.name === person.fatherName)}
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
  );
};
