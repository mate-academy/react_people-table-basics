import React from 'react';

import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { EMPTY_FIELD } from '../../utils/constants';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? (
                  <PersonLink
                    person={person.mother}
                  />
                )
                : (
                  person.motherName || EMPTY_FIELD
                )}
            </td>

            <td>
              {person.father
                ? (
                  <PersonLink
                    person={person.father}
                  />
                )
                : (
                  person.fatherName || EMPTY_FIELD
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
