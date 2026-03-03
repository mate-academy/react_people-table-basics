import cn from 'classnames';
import type { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const findPersonByName = (name: string) => people.find(p => p.name === name);

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
          const mother = person.motherName
            ? findPersonByName(person.motherName)
            : null;

          const father = person.fatherName
            ? findPersonByName(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName && '-'}
                {person.motherName && !mother && person.motherName}
                {mother && <PersonLink person={mother} />}
              </td>

              <td>
                {!person.fatherName && '-'}
                {person.fatherName && !father && person.fatherName}
                {father && <PersonLink person={father} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
