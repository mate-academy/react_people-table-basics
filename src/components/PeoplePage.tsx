import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PersonRow } from './PersonRow';

let data: Person[] | (() => Person[]);

const loadData = async () => {
  data = await getPeople();
};

loadData();

export const PeoplePage = () => {
  const [people] = useState<Person[]>(data);

  return (
    <>
      <h1 className="subtitle is-3">People page</h1>
      <table
        className="
          PeopleTable
          people_table
          table
          is-bordered
        "
      >

        <thead className="thead">
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </thead>

        <tbody>
          {people.map(person => (
            <PersonRow key={person.slug} person={person} />
          ))}
        </tbody>

      </table>
    </>
  );
};
