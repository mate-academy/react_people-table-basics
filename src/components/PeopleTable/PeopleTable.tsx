import React from 'react';
import { Man } from '../../types';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Man[],
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <div>
      <table className="PeopleTable">
        <thead>
          <tr>
            <td>Name</td>
            <td>Sex</td>
            <td>Born</td>
            <td>Died</td>
            <td>Father</td>
            <td>Mother</td>
          </tr>
        </thead>
        <tbody>
          {people.map(man => (
            <PersonRow person={man} key={man.slug} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
