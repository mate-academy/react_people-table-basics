import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { TableRow } from '../TableRow';
import './PeopleTable.scss';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(response => {
      const preparedPeople = response.map((person: Person) => {
        const mother = response.find(
          (dad: Person) => dad.name === person.motherName,
        );

        const father = response.find(
          (dad: Person) => dad.name === person.fatherName,
        );

        return { ...person, father, mother };
      });

      setPeople(preparedPeople);
    });
  }, []);

  return (
    <>
      <table
        className="table is-bordered is-striped"
      >
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <TableRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
