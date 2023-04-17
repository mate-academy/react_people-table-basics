import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  persons: Person[];
};

export const PersonList: React.FC<Props> = ({
  persons,
}) => {
  const { slug: selectedPerson = '' } = useParams();

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
        {persons.map((person) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === slug,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {mother
                ? (
                  <td>
                    <PersonLink person={mother} />
                  </td>
                )
                : (
                  <td>{motherName || '-'}</td>
                )}

              {father
                ? (
                  <td>
                    <PersonLink person={father} />
                  </td>
                )
                : (
                  <td>{fatherName || '-'}</td>
                )}
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
