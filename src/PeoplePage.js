import React, { useEffect, useState } from 'react';
import { getPeople } from './api';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(result => setPeople(result));
  }, []);

  console.log(people);

  return (
    <h1>People page</h1>
  );
};
