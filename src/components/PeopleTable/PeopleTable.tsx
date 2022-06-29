import React, { useState, useEffect } from 'react';
import { PersonRow } from '../PersonRow';
import { getPeople } from '../../api/api';
import { Person, PersonParents } from '../../types/Person';
import './PeopleTable.scss';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[] | []>([]);

  const getNewPerson = () => {
    getPeople().then(result => {
      const newPersons:Person[] = result.map(
        (person:Person) => ({
          ...person,
          father: result.find(
            (parent:PersonParents) => parent.name === person.fatherName,
          ) || null,
          mother: result.find(
            (parent:PersonParents) => parent.name === person.motherName,
          ) || null,
        }),
      );

      setPeople(newPersons);
    });
  };

  useEffect(() => {
    getNewPerson();
  }, []);

  return (
    <>
      <table className="PeopleTable">
        <thead className="PeopleTable__head">
          <tr>
            <td className="PeopleTable__cell">
              Name
            </td>
            <td className="PeopleTable__cell">
              Sex
            </td>
            <td className="PeopleTable__cell">
              Born
            </td>
            <td className="PeopleTable__cell">
              Died
            </td>
            <td className="PeopleTable__cell">
              Mother
            </td>
            <td className="PeopleTable__cell">
              Father
            </td>
          </tr>
        </thead>
        <tbody>
          {
            people.map(person => {
              return (
                <PersonRow
                  key={person.name}
                  person={person}
                />
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};
