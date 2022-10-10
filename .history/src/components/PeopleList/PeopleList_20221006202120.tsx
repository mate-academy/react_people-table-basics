import { useEffect, useState } from 'react';
import PeopleItem from '../PeopleItem';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectPerson] = useState(0);

  useEffect(() => {
    getPeople().then(value => setPeople(value));
  }, []);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PeopleItem
          key={person.slug}
          person={person}
          selectedPerson={selectedPerson} />
        ))}
      </tbody>
    </table>
  );
};
