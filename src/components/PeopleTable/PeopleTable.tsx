import { FC } from 'react';
import { PersonFull } from '../../services/types';
import { PeopleTableHeaders } from './PeopleTableHeaders';
import { PeopleTableRow } from './PeopleTableRow';

interface Props {
  people: PersonFull[];
}

export const PeopleTable: FC<Props> = ({ people }) => (
  <table className="table is-striped people-table">
    <PeopleTableHeaders />
    <tbody>
      {people.map(person => (
        <PeopleTableRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);
