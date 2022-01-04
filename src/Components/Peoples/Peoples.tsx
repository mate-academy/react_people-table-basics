import React from 'react';
import { People } from '../../types/People';
import { PeopleRow } from './PeopleRow';

import './Peoples.scss';

type Props = {
  people: People[],
};

export const Peoples:React.FC<Props> = ({ people }) => (
  <div className="peoples">
    <h3 className="title is-3">People</h3>

    <table className="table is-narrow">
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
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Father</th>
          <th>Mother</th>
        </tr>
      </tfoot>
      <tbody>
        {people.map(p => (
          <PeopleRow people={p} key={p.slug} />
        ))}
      </tbody>
    </table>
  </div>
);
