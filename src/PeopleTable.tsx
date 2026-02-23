import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { PersonLink } from './PersonLink';
import { PersonWithParents } from './types/PersonWithParents';

interface Props {
  people: PersonWithParents[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherPerson ? (
                <PersonLink person={person.motherPerson} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.fatherPerson ? (
                <PersonLink person={person.fatherPerson} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
