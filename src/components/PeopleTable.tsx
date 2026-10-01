import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const peopleByName = new Map(people.map(person => [person.name, person]));

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
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} name={person.name} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                name={person.motherName}
                person={
                  person.motherName
                    ? peopleByName.get(person.motherName)
                    : undefined
                }
              />
            </td>
            <td>
              <PersonLink
                name={person.fatherName}
                person={
                  person.fatherName
                    ? peopleByName.get(person.fatherName)
                    : undefined
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
