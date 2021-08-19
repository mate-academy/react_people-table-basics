import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const addPeople = async() => setPeople(await getPeople());

    addPeople();
  }, []);

  return (
    <div className="App">
      <h1>People Page</h1>
      {people.map(person => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};
