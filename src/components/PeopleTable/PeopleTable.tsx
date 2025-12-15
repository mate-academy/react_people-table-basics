import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: personSlug } = useParams();

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
            slug,
            sex,
            born,
            died,
            mother,
            father,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : motherName ? (
                  motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : fatherName ? (
                  fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
