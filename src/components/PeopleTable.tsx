import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const peopleWithParents: Person[] = people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),
    father: people.find(father => father.name === person.fatherName),
  }));

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
        {peopleWithParents.map(person => {
          const {
            sex, slug, born, died, mother, father, motherName, fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === selectedSlug },
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
          );
        })}
      </tbody>
    </table>
  );
};
