import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';

import './PeopleTable.scss';
import { PersonRow } from '../PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    (async function getPeopleFromServer() {
      const peopleFromServer = await getPeople();
      const preparedPeople = peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer
          .find(mother => mother.name === person.motherName) || null,
        father: peopleFromServer
          .find(father => father.name === person.fatherName) || null,
      }));

      setPeople(preparedPeople);
    }());
  }, []);

  if (!people.length) {
    return (
      <h3>People are loading...</h3>
    );
  }

  return (
    <table className="PeopleTable table table is-hoverable">
      <thead>
        <tr>
          <th className="title is-4">name</th>
          <th className="title is-4">sex</th>
          <th className="title is-4">born</th>
          <th className="title is-4">died</th>
          <th className="title is-4">mother</th>
          <th className="title is-4">father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow person={person} />
        ))}
      </tbody>
    </table>
  );
};
