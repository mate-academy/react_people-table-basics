import React, { useEffect, useState } from 'react';
import { getPeople } from '../helpers/api';
import { People } from '../helpers/interfaces';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeopleFromServer = async() => {
      const people = await getPeople();
      const preparedPeople = people.map((person: People) => {
        const preparedPerson = {
          ...person,
          mother: people.find(
            (mother: People) => mother.name === person.motherName,
          ),
          father: people.find(
            (father: People) => father.name === person.fatherName,
          ),
        };

        return { ...preparedPerson };
      });
      setPeople(preparedPeople);
    };
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h2 className='title'>
        People Page
      </h2>
      <PeopleTable people={people} />
    </>

  )
}
