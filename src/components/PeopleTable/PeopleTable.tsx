import classNames from 'classnames';

import { PersonLink } from '../PersonLink/PersonLink';

import { Person } from '../../types';

type Props = {
  people: Person[];
  id: string;
};

export const PeopleTable: React.FC<Props> = ({ people, id }) => {
  const findParent = (
    array: Person[], parentName: string | null,
  ): Person | null => {
    return array.find(parent => parent.name === parentName) || null;
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
        {people.map((person) => {
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
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === id,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={mother} />
                  )
                  : motherName || ('-')}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || ('-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
