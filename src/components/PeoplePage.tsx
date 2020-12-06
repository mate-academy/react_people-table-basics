import React, { useEffect, useState } from 'react';

import PeopleTable from './PeopleTable';
import { Person } from './PersonInterface';

const People = () => {
const [people, setPeople] = useState([]);

const getPeople = () => {
  return fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then((res) => res.json())
    .then((res) => {
      return res.map((person: Person) => {
        person.father = person.fatherName
        person.mother = person.motherName

        return person;
      });
    })
}

useEffect(() => {
  getPeople()
    .then(people => setPeople(people))
}, [])
console.log(people)

  return (
    <div>
      <h2 className="home">People Page</h2>
      <PeopleTable people={people} />
    </div>
  )
  
}

export default People;