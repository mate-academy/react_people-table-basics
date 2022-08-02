import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { Person } from '../type/type';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(person => setPeople(person));
  }, []);

  return (
    <>
      <p className="nav__text">People Page</p>
      <table className="table people-table">
        <thead>
          <tr>
            <th className="table is-hoverable">
              Name
            </th>
            <th className="table is-hoverable">
              Sex
            </th>
            <th className="table is-hoverable">
              Born
            </th>
            <th className="table is-hoverable">
              Died
            </th>
            <th className="table is-hoverable">
              Father
            </th>
            <th className="table is-hoverable">
              Mother
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonRow person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
