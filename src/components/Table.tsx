/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';

const PersonLink = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

const Table = ({ people }: { people: Person[] }) => {
  const param = useParams();

  const computedPeople = useMemo(
    () =>
      people.map(el => {
        const mother = people.find(person => person.name === el.motherName);
        const father = people.find(person => person.name === el.fatherName);

        return { ...el, mother, father };
      }),
    [people],
  );

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
        {computedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={cn({
              'has-background-warning': person.slug === param.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
