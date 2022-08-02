import { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { Person } from '../react-app-env';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    <>
      <h2 className="title notification is-large is-success">TableList</h2>

      <table className="PeopleTable table">
        <tbody className="tbody">
          <tr className="tr">
            <th className="td">Name</th>
            <th className="td">Sex</th>
            <th className="td">Born</th>
            <th className="td">Died</th>
            <th className="td">Mother</th>
            <th className="td">Father</th>
          </tr>

          {people.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
