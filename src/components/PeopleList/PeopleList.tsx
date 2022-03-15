import React, { useEffect, useState } from 'react';
import { peopleFromServer } from '../../api/people';
import { Person } from '../../react-app-env';

export const PeopleList: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  const loadPeople = async () => {
    const getPeople = await peopleFromServer();

    setPeople(getPeople);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="table-container">
      <h2 className="subtitle is-2">People page</h2>
      <table className="table is-bordered">
        <thead>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </thead>
        <tbody>
          {people && people.map(person => (
            <tr>
              <td>{person.name}</td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName}</td>
              <td>{person.fatherName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
