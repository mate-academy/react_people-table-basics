import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableLink } from '../TableLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personId } = useParams();

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
            born,
            died,
            fatherName,
            father,
            motherName,
            mother,
            sex,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': personId === slug },
              )}
            >
              <td>
                <TableLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <TableLink person={mother} />
                  )
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? (
                    <TableLink person={father} />
                  )
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
