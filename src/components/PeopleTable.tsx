import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  slug: string | undefined,
};

const getParent = (parent: Person | undefined, parentName: string | null) => {
  if (!parentName) {
    return '-';
  }

  if (!parent) {
    return parentName;
  }

  return <PersonLink person={parent} />;
};

export const PeopleTable: FC<Props> = ({ people, slug }) => (
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
      {people.map(person => (
        <tr
          data-cy="person"
          key={person.slug}
          className={classNames(
            {
              'has-background-warning': slug === person.slug,
            },
          )}
        >
          <td>
            <PersonLink person={person} />
          </td>

          <td>
            {person.sex}
          </td>

          <td>
            {person.born}
          </td>

          <td>
            {person.died}
          </td>

          <td>
            {getParent(person.mother, person.motherName)}
          </td>

          <td>
            {getParent(person.father, person.fatherName)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
