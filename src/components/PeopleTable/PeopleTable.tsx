import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  const { selectedSlug } = useParams();

  const findHuman = useCallback((humanName: string | null) => {
    return people.find(
      human => human.name === humanName,
    );
  }, [people]);

  return (
    <table
      data-cy="peopleTable"
      className={classNames(
        'table',
        'is-striped',
        'is-hoverable',
        'is-narrow',
        'is-fullwidth',
      )}
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

          const father = findHuman(fatherName);
          const mother = findHuman(motherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                {
                  'has-background-warning': slug === selectedSlug,
                },
              )}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PeopleLink person={mother as Person} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PeopleLink person={father as Person} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
