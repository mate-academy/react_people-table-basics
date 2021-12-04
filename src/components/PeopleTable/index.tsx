import React from 'react';
import { People } from '../../types/People';
import './PeopleTable.scss';

type Props = {
  people: People[];
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
      </thead>
      <tbody>
        {
          people.length > 0
            ? (
              people.map(el => (
                <tr key={el.name}>
                  <td>{el.name}</td>
                  <td>{el.sex}</td>
                  <td>{el.born}</td>
                  <td>{el.died}</td>
                  <td>{el.fatherName ? el.fatherName : '----'}</td>
                  <td>{el.motherName ? el.motherName : '----'}</td>
                </tr>
              ))
            ) : (
              <tr><td>People not found</td></tr>
            )
        }
      </tbody>
    </table>
  );
});
