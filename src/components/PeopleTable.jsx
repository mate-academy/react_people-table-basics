import React from 'react';
import './PeopleTable.css';

export const PeopleTable = ({people}) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <td>name</td>
        <td>sex</td>
        <td>born</td>
        <td>died</td>
        <td>mother</td>
        <td>father</td>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <tr className="Person">
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.mother.name}</td>
          <td>{person.father.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
