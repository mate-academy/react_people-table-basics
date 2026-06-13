import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const renderPerson = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(person => person.name === name);

    if (foundPerson) {
      return <PersonLink person={foundPerson} />;
    } else {
      return name;
    }
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
            key={person.name}
            data-cy="person"
            className={cn(person.slug === slug && 'has-background-warning')}
          >
            <td>{renderPerson(person.name)}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPerson(person.motherName)}</td>
            <td>{renderPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
