import { useState } from 'react';
import { getPeople } from '../api';
import { PreparedPerson } from '../Types/PreparedPerson';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<PreparedPerson[]>([]);

  getPeople()
    .then(peopleFromServer => setPeople(peopleFromServer));

  const preparedPeople = people
    .map(currentPerson => ({
      ...currentPerson,
      mother: people.find(person => person.name === currentPerson.motherName),
      father: people.find(person => person.name === currentPerson.fatherName),
    }));

  return (
    <div className="container">
      <h1 className="title">People table</h1>
      <table className="PeopleTable table is-wide is-fullwidth">
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
        <tbody>
          {preparedPeople.map(person => (
            <PersonRow key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
