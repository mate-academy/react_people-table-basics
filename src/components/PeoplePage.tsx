import React, { useState, useEffect } from 'react';

import { PeopleTable } from './PeopleTable';

const API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getPeople = async () => {
    const response = await fetch(API);

    return response.json();
  };

  const getAllPeople = async () => {
    await getPeople()
      .then(result => setPeople(result.map((person: Person) => {
        const mother = result.find((mama: Person) => {
          return person.motherName === mama.name;
        });

        const father = result.find((dad: Person) => {
          return person.fatherName === dad.name;
        });

        return { ...person, mother, father };
      })));
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      <h2 className="h2">
        People page
      </h2>
      <PeopleTable people={people} />
    </>
  );
};
