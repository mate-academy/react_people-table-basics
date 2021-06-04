import React, { useState, useEffect } from 'react';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api/api';

export const PeoplePage = () => {
  const [people, setPeople] = useState(null);
  const personRows = [
    'name',
    'sex',
    'born',
    'died',
    'mother',
    'father',
  ];

  useEffect(() => {
    getPeople()
      .then((res) => {
        const peopleData = res.map((person, index) => ({
          id: index + 1,
          name: person.name,
          sex: person.sex === 'f' ? 'female' : 'male',
          born: person.born,
          died: person.died,
          mother: person.motherName ? person.motherName : '\u{02212}',
          father: person.fatherName ? person.fatherName : '\u{02212}',
        }));

        return setPeople(peopleData);
      });
  }, []);

  if (people) {
    return (
      <div className="page page--people">
        <PeopleTable
          people={people}
          personRows={personRows}
        />
      </div>
    );
  }

  return (
    <div className="page page--people">
      <i>Loading people data...</i>
    </div>
  );
};
