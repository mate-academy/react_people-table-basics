import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const findParent = (personName: string | null) => {
    const parent = people.find(({ name }) => name === personName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return personName || '-';
  };

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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findParent(motherName)}</td>
              <td>{findParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
