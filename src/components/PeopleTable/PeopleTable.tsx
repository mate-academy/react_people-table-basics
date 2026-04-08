/* eslint-disable */

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  persons: Person[];
};

export const PeopleTable = ({ persons }: Props) => {
  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
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
          {persons.map(person => {
            return <PersonLink key={person.slug} person={person} />;
          })}
        </tbody>
      </table>
    </>
  );
};
