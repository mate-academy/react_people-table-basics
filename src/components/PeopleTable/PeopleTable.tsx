import {
  FC,
} from 'react';
import { Person as PersonType } from '../../types';
import { theadItems } from '../../utils/data';
import { Person } from './Person';

type Props = {
  people: PersonType[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {theadItems.map(({ id, title }) => <th key={id}>{title}</th>)}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <Person person={person} />
        ))}
      </tbody>
    </table>
  );
};
