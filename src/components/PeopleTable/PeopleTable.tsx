import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { findParent } from '../utils/findParent';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
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

      {people.map(person => {
        const {
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
        } = person;

        const mother = findParent(people, motherName);
        const father = findParent(people, fatherName);

        return (
          <tbody key={slug}>
            <tr
              data-cy="person"
              className={classNames(
                { 'has-background-warning': selectedSlug === slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
