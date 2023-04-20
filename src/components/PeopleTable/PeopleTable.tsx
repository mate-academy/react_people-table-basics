import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

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
        {people.map((person) => {
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
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === selectedSlug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : (motherName || '-')}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : (fatherName || '-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
