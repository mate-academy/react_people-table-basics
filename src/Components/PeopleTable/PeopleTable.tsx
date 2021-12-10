import React from 'react';
import { Human } from '../../types/Human';
import './PeopleTable.scss';

type Props = {
  people: Human[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="container">
      <table className="table">
        <thead className="table__header">
          <tr>
            <td className="table__header-data">Name</td>
            <td className="table__header-data">Sex</td>
            <td className="table__header-data">Born</td>
            <td className="table__header-data">Died</td>
            <td className="table__header-data">Father name</td>
            <td className="table__header-data">Mother name</td>
          </tr>
        </thead>
        <tbody>
          {people?.map((person) => (
            <tr className="table__main">
              <td className="table__main-data">{person.name}</td>
              <td className="table__main-data">{person.sex === 'm' ? 'man' : 'woman'}</td>
              <td className="table__main-data">{person.born}</td>
              <td className="table__main-data">{person.died}</td>
              <td className="table__main-data">{person.fatherName}</td>
              <td className="table__main-data">{person.motherName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
