import { FC } from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelectPerson: (slug: string) => void;
};

export const PeopleTable: FC<Props> = ({
  people,
  selectedSlug,
  onSelectPerson,
}) => {
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
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
                onClick={() => onSelectPerson(person.slug)}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink
                name={person.motherName}
                people={people}
                onSelectPerson={onSelectPerson}
              />
            </td>
            <td>
              <PersonLink
                name={person.fatherName}
                people={people}
                onSelectPerson={onSelectPerson}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
