import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const getPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
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
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} people={people} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.motherName ? (
                getPersonByName(person.motherName) ? (
                  <PersonLink
                    person={getPersonByName(person.motherName)!}
                    people={people}
                  />
                ) : (
                  <span className="has-text-danger">{person.motherName}</span>
                )
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.fatherName ? (
                getPersonByName(person.fatherName) ? (
                  <PersonLink
                    person={getPersonByName(person.fatherName)!}
                    people={people}
                  />
                ) : (
                  <span>{person.fatherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
