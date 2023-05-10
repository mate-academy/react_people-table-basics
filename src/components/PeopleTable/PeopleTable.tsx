import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../MainNav/PersonLink/PersonLink';

interface Props {
  people: Person[]
  link: string
}

export const PeaopleTable: FC<Props> = ({ people, link = '' }) => {
  const isSelected = (person: Person) => person.slug === link;

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
            name,
            sex,
            born,
            died,
            slug,
            mother,
            father,
            fatherName,
            motherName,
          } = person;

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected(person),
              })}
            >
              <td>
                <PersonLink
                  to={slug}
                  text={name}
                  sex={sex}
                />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother
                ? (
                  <td>
                    <PersonLink
                      to={mother.slug}
                      text={mother.name}
                      sex={mother.sex}
                    />
                  </td>
                ) : (
                  <td>
                    {motherName || '-'}
                  </td>
                )}
              {father
                ? (
                  <td>
                    <PersonLink
                      to={father.slug}
                      text={father.name}
                    />
                  </td>
                ) : (
                  <td>
                    {fatherName || '-'}
                  </td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
