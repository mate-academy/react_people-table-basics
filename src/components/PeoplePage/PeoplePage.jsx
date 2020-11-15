import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeopleFromServer = async() => {
      const peopleFromServer = await getPeople();

      const preparedPeopleFromServer = peopleFromServer.map((person) => {
        const preparedPerson = {
          ...person,
          mother: people.find(
            mother => mother.name === person.motherName,
          ),
          father: people.find(
            father => father.name === person.fatherName,
          ),
        };

        return { ...preparedPerson };
      });

      setPeople(preparedPeopleFromServer);
    };

    getPeopleFromServer();
  }, [people]);

  return (
    <>
      <h2>People page</h2>
      {!!people.length && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
