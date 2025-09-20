import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedPerson: string | null;
  onSelect: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  onSelect,
}) => (
  <table className="table is-striped is-hoverable is-narrow is-fullwidth">
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
        const slug = `${person.name}-${person.born}`;
        return (
          <tr
            key={slug}
            onClick={() => onSelect(slug)}
            className={classNames({
              'has-background-warning': slug === selectedPerson,
            })}
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
