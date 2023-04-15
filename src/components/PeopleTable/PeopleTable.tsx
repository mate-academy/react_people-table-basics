import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { getParent } from '../../helpers';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => (
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
      {people.map(person => {
        const {
          slug,
          motherName,
          fatherName,
        } = person;
        const mother = getParent(people, motherName);
        const father = getParent(people, fatherName);

        const personWithParents = {
          ...person,
          mother,
          father,
        };

        return (
          <PersonInfo
            key={slug}
            person={personWithParents}
          />
        );
      })}
    </tbody>
  </table>
);
