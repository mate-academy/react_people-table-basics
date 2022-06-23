import React from 'react';
import './App.scss';

type Props = {
  peoples: People[]
};

export const PeopleTable:React.FC<Props> = ({ peoples }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Born</th>
          <th>Died</th>
          <th>Sex</th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
      </thead>
      <tbody>
        {peoples.map(people => (
          <tr className="Person" key={people.name}>
            <td>{people.name}</td>
            <td>{people.born}</td>
            <td>{people.died}</td>
            <td>{people.sex}</td>
            <td>{people?.father?.name}</td>
            <td>{people?.mother?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
