import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  people: Person[];
  selected?: Person;
};

export const PeopleTable: React.FC<Props> = ({ people, selected }) => (
  <table className="table is-fullwidth is-striped">
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
          key={person.id}
          className={classNames({
            'has-background-warning': selected?.id === person.id,
          })}
        >
          <td>
            <Link
              to={`/people/${person.slug}`}
              className={person.sex === 'f' ? 'has-text-danger' : ''}
            >
              {person.name}
            </Link>
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            <PersonLink personName={person.motherName} people={people} />
          </td>
          <td>
            <PersonLink personName={person.fatherName} people={people} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
