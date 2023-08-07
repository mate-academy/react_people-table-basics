import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

export const PeopleTable: FC<Props> = ({ people, slug }) => {
  const getParent = useMemo(() => {
    return (parentName: string) => {
      const parent = people.find(person => person.name === parentName);

      return parent
        ? <PersonLink person={parent} />
        : parentName;
    };
  }, [slug]);

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
        { people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? getParent(person.motherName) : '-'}
            </td>
            <td>
              {person.fatherName ? getParent(person.fatherName) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
