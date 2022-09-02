import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: FC<Props> = (props) => {
  const { people, selectedPersonSlug } = props;

  const getMother = (person: Person) => {
    return people.find(mother => person.motherName === mother.name) || null;
  };

  const getFather = (person: Person) => {
    return people.find(father => person.fatherName === father.name) || null;
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
            className={classNames(
              { 'has-background-warning': person.slug === selectedPersonSlug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {getMother(person)
                ? (
                  <Link
                    to={`/people/${getMother(person)?.slug}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                )
                : person.motherName || '-'}
            </td>
            <td>
              {getFather(person)
                ? (
                  <Link
                    to={`/people/${getFather(person)?.slug}`}
                  >
                    {person.fatherName}
                  </Link>
                )
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
