import React, { useState } from 'react';
import { TableDetails } from './TableDetails';

import { Person } from '../../types/Person';

interface Props {
  personData: Person[];
}

export const TableList: React.FC<Props> = ({ personData }) => {
  const [clickedSlug, setClickedSlug] = useState('Home');

  const addClassToRow = (slug: string) => {
    setClickedSlug(slug);
  };

  const combineData = personData.map((person) => {
    const mother = personData.find((motherPerson) => {
      return motherPerson.name === person.motherName;
    });
    const father = personData.find((fatherPerson) => {
      return fatherPerson.name === person.fatherName;
    });

    return {
      ...person,
      mother,
      father,
    };
  });

  return (
    <div className="box table-container">
      {personData.length > 0 && (
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
            {combineData.map((person) => (
              <TableDetails
                person={person}
                key={person.slug}
                addClassToRow={addClassToRow}
                clickedSlug={clickedSlug}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
