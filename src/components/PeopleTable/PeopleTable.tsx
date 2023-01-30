import cn from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable:FC<Props> = ({ people }) => {
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
        {people.map(person => {
          const {
            slug: personSlug, sex, born, died,
            fatherName, motherName, mother, father,
          } = person;

          return (
            <tr
              key={personSlug}
              data-cy="person"
              className={cn({ 'has-background-warning': personSlug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName && mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {fatherName && father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
