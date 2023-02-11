import { useState } from 'react';
import { Person } from '../../types';
import { PerosnLink } from '../PersonLink';

type Props = {
  peopleList: Person[],
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [isActiveRow, setIsActiveRow] = useState('');

  return (
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
        {peopleList.map((item) => {
          const person = { ...item };

          if (item.fatherName || item.motherName) {
            for (let i = 0; i < peopleList.length; i += 1) {
              if (peopleList[i].name === item.fatherName) {
                person.father = peopleList[i];
              }

              if (peopleList[i].name === item.motherName) {
                person.mother = peopleList[i];
              }
            }
          }

          return (
            <PerosnLink
              person={person}
              key={person.slug}
              setIsActiveRow={setIsActiveRow}
              isActiveRow={isActiveRow}
            />
          );
        })}
      </tbody>
    </table>
  );
};
