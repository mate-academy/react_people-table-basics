import React, { useState } from 'react';
import { TableDetails } from './TableDetails';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';

import { Person } from '../../types/Person';

interface Props {
  personData: Person[];
  error: string;
}

export const TableList: React.FC<Props> = ({ personData, error }) => {
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

    <>
      {error && <Error error={error} />}
      {!error && personData.length > 0 && (
        <div>
          <h1 className="title">People Page</h1>

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
        </div>
      )}
      {!error && personData.length && <Loader />}

    </>
  );
};
