import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: FC<Props> = ({ people, selectedPersonSlug }) => {
  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={cn({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
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
            className={cn(
              { 'has-background-warning': selectedPersonSlug === person.slug },
            )}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
