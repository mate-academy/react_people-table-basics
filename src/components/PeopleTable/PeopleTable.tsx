import { FC, memo } from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

interface PeopleTableProps {
  people: Person[]
}

export const PeopleTable: FC<PeopleTableProps> = memo(
  ({ people }) => {
    return (
      <table className="PeopleTable">
        <thead>
          <th className="PersonRow__data">Name</th>
          <th className="PersonRow__data">Sex</th>
          <th className="PersonRow__data">Born</th>
          <th className="PersonRow__data">Died</th>
          <th className="PersonRow__data">FatherName</th>
          <th className="PersonRow__data">MotherName</th>
        </thead>
        <tbody>
          {
            people.map(person => (
              <PersonRow person={person} key={person.name} />
            ))
          }
        </tbody>
      </table>
    );
  },
);
