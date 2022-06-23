import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people,
    setPeople,
  ] = useState<PersonWithParents[]>([]);

  const getAllPeople = async () => {
    const result = await getPeople();

    const filteredPeople = result.map((person: Person) => {
      const mother = result
        .find((woman: Person) => woman.name === person.motherName) || null;
      const father = result
        .find((man: Person) => man.name === person.fatherName) || null;

      return { ...person, mother, father };
    });

    setPeople(filteredPeople);
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      <h2>People Page</h2>
      {people && (
        <table className="PeopleTable">
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
              <tr
                key={person.slug}
                className="Person"
              >
                <td>{person.name}</td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{person.mother?.name || 'no mother'}</td>
                <td>{person.father?.name || 'no father'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
