import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

interface PeopleTableProps {
  people: Person[];
  selectedPersonSlug: string | null;
}

export const PeopleTable = ({ people, selectedPersonSlug }: PeopleTableProps) => {
  const getPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }
    return people.find(p => p.name === name) || null;
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
            className={classNames({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={getPersonByName(person.motherName)}
                name={person.motherName}
              />
            </td>
            <td>
              <PersonLink
                person={getPersonByName(person.fatherName)}
                name={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
