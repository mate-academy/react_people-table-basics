import React from 'react';
import { IPeople } from '../../types/types';
import { PersonRow } from '../5_PersonRow/PersonRow';
import './people.scss';

interface Props {
  people: IPeople[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <th>Name</th>
      <th>Sex</th>
      <th>Mather name</th>
      <th>Father name</th>
      <th>Born</th>
      <th>Died</th>
      <th>Slug</th>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
