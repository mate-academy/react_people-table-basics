import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import './PeoplePage.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((peoples) => {
        setPeople(peoples);
      });
  }, []);

  return (
    <>
      <h1>People Page</h1>

      {people && (
        <ul>
          {people.map(user => (
            <li>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
