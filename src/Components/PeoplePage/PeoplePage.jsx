import React, { useState, useEffect } from 'react';
import { getPeople } from '../../Api';
import { PersonTable } from '../PeopleTable';

import './peoplePage.css';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  const findParents = (array) => {
    const result = array.map((person) => {
      // eslint-disable-next-line no-param-reassign
      person.mother = array.find(({ name }) => name === person.motherName);
      // eslint-disable-next-line no-param-reassign
      person.father = array.find(({ name }) => name === person.fatherName);

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

      <PersonTable people={people} />
    </>
  );
};
