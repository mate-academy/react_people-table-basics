import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable: FC<Props> = ({ people, slug }) => {
  const parentsLink = (person: Person, sex: 'f' | 'm') => {
    if (sex === 'f') {
      if (person.mother) {
        return <PersonLink person={person.mother} />;
      }

      return person.motherName || '-';
    }

    if (person.father) {
      return <PersonLink person={person.father} />;
    }

    return person.fatherName || '-';
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
        {people.map(person => (
          <tr
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{parentsLink(person, 'f')}</td>
            <td>{parentsLink(person, 'm')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
