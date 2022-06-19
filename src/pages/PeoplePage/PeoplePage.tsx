import React, { useState, useEffect } from 'react';
import { PersonRow } from '../PersonRow';
import { Person } from '../../types/Person';
import { getPeoplesList } from '../../api/api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeoplesList(setPeople);
  }, []);

  return (
    <div className="peoplePage">
      <h1 className="title">People page</h1>
      {people.length > 0
      && (
        <table className="peoplePage__table">
          <thead>
            <tr className="peoplePage__row">
              <td>
                name
              </td>
              <td>
                sex
              </td>
              <td>
                born
              </td>
              <td>
                died
              </td>
              <td>
                mother
              </td>
              <td>
                father
              </td>
            </tr>
            <PersonRow people={people} />
          </thead>
        </table>
      )}
    </div>
  );
};
