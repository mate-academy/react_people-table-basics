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
            <td className="td">Name</td>
            <td className="td">Sex</td>
            <td className="td">Born</td>
            <td className="td">Died</td>
            <td className="td">Mother</td>
            <td className="td">Father</td>
          </tr>

          {people.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
