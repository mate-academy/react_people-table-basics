/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useEffect } from 'react';
import { getPeople } from '../api/api';
import { PersonRow } from './PersonRow';

const tableHeaders = ['name', 'sex', 'born', 'died', 'mother', 'father'];

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const peopleWithParents = people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),
    father: people.find(father => father.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People page</h1>
      <h3 className="subtitle">
        legend: ✅ - found in database / ❌ - not found
      </h3>

      <table className="table
          is-striped is-hoverable
          is-narrow is-scrollable
          has-sticky-header"
      >
        <thead className="is-grey-lighter">
          <tr>
            {tableHeaders.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {peopleWithParents.map(person => (
            <PersonRow person={person} />
          ))}
        </tbody>

      </table>
    </>
  );
};
