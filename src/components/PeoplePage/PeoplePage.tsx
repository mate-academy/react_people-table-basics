import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person } from '../Person/Person';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const loadPeopleFromServer = async () => {
      setPeople(await getPeople());
    };

    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1>People Page</h1>
      <table className="people">
        <thead className="people__head">
          <tr className="people__row people__row--head">
            <th className="people__header-cell people__header-cell--name">
              Name
            </th>
            <th className="people__header-cell people__header-cell--sex">
              Sex
            </th>
            <th className="people__header-cell people__header-cell--born">
              Born
            </th>
            <th className="people__header-cell people__header-cell--died">
              Died
            </th>
            <th className="people__header-cell people__header-cell--mother">
              Mother
            </th>
            <th className="people__header-cell people__header-cell--father">
              Father
            </th>
          </tr>
        </thead>
        <tbody className="people__body">
          {people.map(person => (
            <Person person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
