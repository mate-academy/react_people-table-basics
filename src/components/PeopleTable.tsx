import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const getPersonByName = (name: string | null) =>
    people.find(person => person.name === name);

  const getParentTableData = (person: Person, forMother: boolean) => {
    if (forMother) {
      return (
        <td>
          {person.motherName === null ? (
            '-'
          ) : getPersonByName(person.motherName) ? (
            <PersonLink person={getPersonByName(person.motherName) as Person} />
          ) : (
            person.motherName
          )}
        </td>
      );
    } else {
      return (
        <td>
          {person.fatherName === null ? (
            '-'
          ) : getPersonByName(person.fatherName) ? (
            <PersonLink person={getPersonByName(person.fatherName) as Person} />
          ) : (
            person.fatherName
          )}
        </td>
      );
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
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': slug === person.slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {getParentTableData(person, true)}
            {getParentTableData(person, false)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
