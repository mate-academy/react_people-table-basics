import React from 'react';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

const isLinkedPerson = (name: string, table: Person[]) => {
  const foundPerson = table.find(person => person.name === name);

  return foundPerson
    ? <PersonLink person={foundPerson} />
    : name;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
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
        {
          people.map(person => (
            <tr
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
                {
                  person.motherName
                    ? isLinkedPerson(person.motherName, people)
                    : '-'
                }
              </td>
              <td>
                {
                  person.fatherName
                    ? isLinkedPerson(person.fatherName, people)
                    : '-'
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
