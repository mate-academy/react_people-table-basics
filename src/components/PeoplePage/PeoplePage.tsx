import React, { useState, useEffect } from 'react';
import { Person } from '../../react-app-env';
import { getPeople } from '../../api/people';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getAllPeople = async () => {
    await getPeople()
      .then(response => setPeople(response.map((person: Person) => {
        const mother = response.find((mom: Person) => {
          return person.motherName === mom.name;
        });

        const father = response.find((dad: Person) => {
          return person.fatherName === dad.name;
        });

        return { ...person, mother, father };
      })));
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <table className="table">
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
        {people.map((person) => {
          const {
            slug,
            name,
            sex,
            born,
            died,
            father,
            mother,
          } = person;

          return (
            <tr className="table-person" key={slug}>
              <td>{name}</td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{father?.name || '- Not found -'}</td>
              <td>{mother?.name || '- Not found -'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
