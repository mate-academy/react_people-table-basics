import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    <table className="PeopleTable">
      <h1 className="PeopleTable__title">People Page</h1>
      <tbody className="PeopleTable__body">
        <tr className="PeopleTable__row">
          <td className="PeopleTable__item">Name</td>
          <td className="PeopleTable__item">Sex</td>
          <td className="PeopleTable__item">Born</td>
          <td className="PeopleTable__item">Died</td>
          <td className="PeopleTable__item">Mother</td>
          <td className="PeopleTable__item">Father</td>
        </tr>
      </tbody>

      {people.map(person => (
        <PersonRow person={person} />
      ))}
    </table>
  );
};
