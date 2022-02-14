import React from 'react';

export const Person: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <tr key={person.name}>
      {Object.keys(person).map(key => (
        <th key={key}>{person[key as keyof Person]}</th>
      ))}
    </tr>
  );
};
