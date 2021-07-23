import React, {useEffect, useState} from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    getPeople()
      .then(result => result
        .map((person: {[key: string]: any}) => ({
          ...person,
          mother: result
            .find((mother: {[key: string]: any}) => mother.name === person.motherName),
          father: result
            .find((father: {[key: string]: any}) => father.name === person.fatherName),
          }
        )))
      .then(setPeople)
  }, []);
  
  return (
    <div className="container">
      <h1 className="title is-4">People page</h1>
      <PeopleTable people={people} />
    </div>
)};
