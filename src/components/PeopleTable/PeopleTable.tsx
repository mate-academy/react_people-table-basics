import React from 'react';
import './PeopleTable.scss';

type Props = {
  people: Human[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr className="PeopleTable__title">
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(human => (
          <tr className="Person" key={human.name}>
            <td>{human.name}</td>
            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>{human.motherName}</td>
            <td>{human.fatherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
