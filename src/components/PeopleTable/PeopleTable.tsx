import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        // Handle error silently or use proper error handling
      });
  }, []);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th></th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      {people.map(person => (
        <tbody key={person.name}>
          <tr data-cy="person">
            <td>
              <a href="#/people/jan-van-brussel-1714">{person.name}</a>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.mother?.name}</td>
            <td>{person.father?.name}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
