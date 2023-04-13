import React from 'react';

import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { PersonLink } from '../PersonLink';

import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug = '' } = useParams();

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
            fatherName,
            motherName,
            mother,
            father,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPersonSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother && (
                  <PersonLink person={mother} />
                )}

                {(!mother && motherName) && motherName}

                {(!mother && !motherName) && '-'}
              </td>
              <td>
                {father && (
                  <PersonLink person={father} />
                )}

                {(!father && fatherName) && fatherName}

                {(!father && !fatherName) && '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
