/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/api';
import { Person } from '../../react-app-env';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer
          .find(mom => mom.name === person.motherName);
        const father = peopleFromServer
          .find(dad => dad.name === person.fatherName);

        return { ...person, mother, father };
      });

      setPeople(preparedPeople);
    })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1
        className="title mt-6"
      >
        People page
      </h1>
      <PeopleTable people={people} />
    </>
  );
};
