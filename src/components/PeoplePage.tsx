import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Persone } from '../types';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([]);

  const getAllPeople = () => {
    getPeople()
      .then(result => result.json())
      .then(result => {
        const newPeople = result.map((p: Persone, ind: number) => {
          return {
            ...p,
            id: ind,
            mother: result.find(
              (persone: Persone) => persone.name === p.motherName,
            ) || null,

            father: result.find(
              (persone: Persone) => persone.name === p.fatherName,
            ) || null,
          };
        });

        setPeople(newPeople);
      });
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      <h2>People page</h2>
      {people.length === 0
        ? <LinearProgress />
        : <PeopleTable people={people} />}
    </>
  );
};

export default PeoplePage;
