import React, { useEffect, useState } from 'react';
import { PersonRow } from '../PersonRow';
import './PeopleTable.css';

export const PeopleTable = () => {
  const [people, setPeople] = useState([]);
  const tableHead = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  // eslint-disable-next-line max-len
  const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

  const getPeople = async() => {
    const peopleArr = await fetch(API_URL).then(res => res.json());

    return peopleArr;
  };

  useEffect(() => {
    getPeople().then(result => result
      .map(human => (
        {
          ...human,
          mother: result
            .find(mother => mother.name === human.motherName) || null,
          father: result
            .find(father => father.name === human.fatherName) || null,
        }
      ))).then(setPeople);
  }, []);

  return (
    <table className="PeopleTable table">
      <thead>
        <tr>
          {tableHead.map(col => (
            <th
              key={col}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
