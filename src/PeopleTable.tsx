import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { People } from './type';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res);
      });
  }, []);

  return (
    <>
      <h1>People table</h1>
      <table className="PeopleTable">
        <thead>
          <tr>
            <td>Name</td>
            <td>Sex</td>
            <td>Born</td>
            <td>Died</td>
            <td>Mother</td>
            <td>Father</td>
          </tr>
        </thead>
        <tbody>
          {people.map(man => <PersonRow person={man} />)}
        </tbody>
      </table>
    </>
  );
};
