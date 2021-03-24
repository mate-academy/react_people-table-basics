import React, { useEffect, useState } from 'react';
import { getPeople } from './api';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <table className="PeopleTable table is-bordered is-striped is-hoverable">
      <thead className="subtitle is-4">
        <tr>
          <td>name</td>
          <td>sex</td>
          <td>born</td>
          <td>died</td>
          <td>mother</td>
          <td>father</td>
        </tr>
      </thead>
      <tbody>
        {people.map(person => <PersonRow person={person} key={person.slug} />)
    }
      </tbody>
    </table>
  );
};
