import React, { useState, useEffect } from 'react';
import { getPeople } from '../../scripts/people';

import { PersonRow } from '../PersonRow';

import './PeoplePage.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  const findParents = (array) => {
    const result = [...array].map((person) => {
      // eslint-disable-next-line no-param-reassign
      person.mother = array.find(({ name }) => name === person.motherName)
        || null;
      // eslint-disable-next-line no-param-reassign
      person.father = array.find(({ name }) => name === person.fatherName)
        || null;

      return person;
    });

    setPeople(result);
  };

  useEffect(() => {
    getPeople()
      .then(findParents);
  }, []);

  return (
    <>
      <h2>People page</h2>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Born</th>
            <th scope="col">Died</th>
            <th scope="col">Mother</th>
            <th scope="col">Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <PersonRow
              key={person.slug}
              person={person}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
