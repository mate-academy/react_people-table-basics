import { useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
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
        {people.map(person => {
          const {
            slug, sex, born, died, mother, motherName, father, fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <PersonLink person={person} />
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother ? (
                <PersonLink person={mother} />
              ) : (
                <td>{motherName || '-'}</td>
              )}
              {father ? (
                <PersonLink person={father} />
              ) : (
                <td>{fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
