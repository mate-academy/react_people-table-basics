import React from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

type Props = {
  persons: Person[];
};

export const People: React.FC<Props> = ({ persons }) => {
  const peopleWithParents = persons.map(person => ({
    ...person,
    mother: persons.find(p => p.name === person.motherName),
    father: persons.find(p => p.name === person.fatherName),
  }));

  const { slug } = useParams();
  const selectedSlug = slug;

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
        {peopleWithParents.map(person => (
          <tr
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
