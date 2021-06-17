import React from "react";

export const PersonRow = ({ peoples }) => (
  <>
    {peoples.map(people => (
      <tr key={people.slug}>
        <td>{people.name}</td><td>{people.sex}</td>
        <td>{people.born}</td><td>{people.died}</td>
        <td>{people.motherName}</td><td>{people.fatherName}</td>
      </tr>
    ))}
  </>
)
