import React from 'react';
import './PersonRow.scss';

interface PersonType {
  person: {[key: string]: any},
}

export const PersonRow = ({ person }: PersonType) => {
  return (
    <tr className="Person">
      {Object.keys(person).filter(elem => elem !== 'slug'
      && elem !== 'fatherName' && elem !== 'motherName')
        .map((key, index) => {
          if ((key === 'mother' || key === 'father') && person[key]) {
            return <td key={`$${index}${person.name}`}>{person[key].name}</td>;
          }

          return <td key={`$${index}${person.name}`}>{person[key]}</td>;
        })}
    </tr>
  );
};
