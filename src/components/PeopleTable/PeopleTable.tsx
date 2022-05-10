import React from 'react';
import { People } from '../../types/people';
import PeopleRow from '../PeopleRow/PeopleRow';
import './PeopleTable.scss';

type Props = {
  people: People[],
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table table-border is-hoverable is-striped is-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <PeopleRow person={person} />
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default PeopleTable;
