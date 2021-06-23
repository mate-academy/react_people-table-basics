import React from "react";

export const PersonRow = ({ peoples }) => {
  const people = peoples.map(person => (
    {...person,
      father: peoples.find(father => father.name === person.fatherName),
      mother: peoples.find(mother => mother.name === person.motherName),
    }
  ))

  return (
    <>
      {people.map(people => (
        <tr key={people.slug}>
          <td>{people.name}</td>
          <td>{people.sex}</td>

          <td>{people.born}</td>
          <td>{people.died}</td>

          <td>{people.mother ? people.mother.name : '-'}</td>
          <td>{people.father ? people.father.name : '-'}</td>
        </tr>
      ))}
    </>
  );
}
