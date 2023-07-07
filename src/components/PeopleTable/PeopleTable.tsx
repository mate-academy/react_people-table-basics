import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const {slug = ''} = useParams();

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
    <tr data-cy="person">
      {people.map(person => (
        <PersonInfo
        key={person.slug}
        person={person}
        selectedPersonSlug={slug}
        />
      ))}
      </tr>
    </tbody>
  </table>
  )
}
