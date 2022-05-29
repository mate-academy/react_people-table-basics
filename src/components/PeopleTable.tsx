import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../type/Person';
import { PersonRow } from './PersonRow';

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
      <table className="table">
        <th className="table__title">Name</th>
        <th className="table__title">Sex</th>
        <th className="table__title">Born</th>
        <th className="table__title">Died</th>
        <th className="table__title">Father</th>
        <th className="table__title">Mother</th>
        <tbody>
          {people.map(human => <PersonRow person={human} />)}
        </tbody>
      </table>
    </>
  );
};
