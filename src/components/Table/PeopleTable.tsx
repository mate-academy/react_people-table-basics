import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const selectedPerson = (slug: string) => {
    return slug === selectedSlug;
  };

  const parents = (name: string | null) => {
    const parent = people.find(person => person.name === name);

    if (!parent) {
      return name || '-';
    }

    return (
      <PersonInfo person={parent} />
    );
  };

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
        {people.map(({
          name,
          sex,
          born,
          died,
          motherName,
          fatherName,
          slug,
        }) => (
          <tr
            key={name}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedPerson(slug),
            })}
          >
            <td>
              <PersonInfo person={{ name, sex, slug }} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>

            <td>
              {parents(motherName)}
            </td>

            <td>
              {parents(fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
