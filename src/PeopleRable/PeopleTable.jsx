import React, { useEffect, useState } from 'react';
import { getPeople } from '../helpers/api';
import { PersonRow } from '../PersonRow/PersonRow';

export function PeopleTable() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <td>name</td>
          <td>sex</td>
          <td>born</td>
          <td>died</td>
          <td>mother</td>
          <td>fother</td>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
}
