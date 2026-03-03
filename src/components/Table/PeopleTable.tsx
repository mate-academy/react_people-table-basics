import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';
import { normalizeSlug } from '../../helper/functionHelp';

type Props = {
  persons: Person[];
};

export const PeopleTable: React.FC<Props> = ({ persons }) => {
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
            data-cy="person"
            key={`${person.name}${person.born}`}
            className={classNames({
              'has-background-warning':
                slug === `${normalizeSlug(person.name)}-${person.born}`,
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
                person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <PersonLink person={person.father} />
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
