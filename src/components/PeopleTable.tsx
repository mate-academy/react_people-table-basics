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

  const getParentTableData = (
    person: Person,
    parentKey: 'motherName' | 'fatherName',
  ) => {
    const parentName = person[parentKey];
    const parent = getPersonByName(parentName);

    return (
      <td>
        {parentName === null ? (
          '-'
        ) : parent ? (
          <PersonLink person={parent} />
        ) : (
          parentName
        )}
      </td>
    );
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
            {getParentTableData(person, 'motherName')}
            {getParentTableData(person, 'fatherName')}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
