import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent
      ? <PersonLink person={parent} />
      : parentName;
  };

  const { slug } = useParams();

  const selectedPerson = slug;

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
            className={cn({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={cn({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                ? findParent(person.motherName)
                : '-'}
            </td>
            <td>
              {person.fatherName
                ? findParent(person.fatherName)
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};
