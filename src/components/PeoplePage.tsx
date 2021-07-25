import React, {useEffect, useState} from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

type Person = {
  [key: string]: any
}

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    getPeople()
      .then(result => result
        .map((person: Person) => ({
          ...person,
          mother: result
            .find((mother: Person) => mother.name === person.motherName),
          father: result
            .find((father: Person) => father.name === person.fatherName),
          }
        )))
      .then(setPeople);
  }, []);
  
  return (
    <div className="container">
      <h1 className="title is-4">People page</h1>
      <PeopleTable people={people} />
    </div>
)};
