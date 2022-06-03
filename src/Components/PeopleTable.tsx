import React, { useEffect, useState } from 'react';
import { Person } from '../Types/Person';
import { PersonRow } from './PersonRow';

const BASE_URL = (
  'https://mate-academy.github.io/react_people-table/api/people.json'
);

export const getPeople = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const peopleFromServer = async () => {
      setPeople(await getPeople());
    };

    peopleFromServer();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <table className="PeopleTable">
        <th className="PeopleTable__title">Name</th>
        <th className="PeopleTable__title">Sex</th>
        <th className="PeopleTable__title">Born</th>
        <th className="PeopleTable__title">Died</th>
        <th className="PeopleTable__title">Father</th>
        <th className="PeopleTable__title">Mother</th>
        <tbody>
          {people.map(human => <PersonRow person={human} />)}
        </tbody>
      </table>
    </>
  );
};
