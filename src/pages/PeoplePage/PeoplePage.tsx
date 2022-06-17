import React, { useState, useEffect } from 'react';
import { PersonRow } from '../PersonRow';
import { Peoples } from '../../types/Peoples';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Peoples[]>([]);

  useEffect(() => {
    const url = `https://mate-academy.github.io/react_people-table
/api/people.json`;

    fetch(url)
      .then(resp => resp.json())
      .then(data => setPeople(data));
  }, []);

  return (
    <div className="peoplePage">
      <h1>People page</h1>
      {people
      && (
        <table>
          <thead>
            <tr>
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
