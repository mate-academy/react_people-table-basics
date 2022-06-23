import React, { useEffect, useState } from 'react';
import { People, PersonWithParents } from '../../react-app-env';
import { getPeople } from '../../api';
import { PeopleRow } from './PeopleRow/PeopleRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeople()
      .then(persons => setPeople(persons));
  }, []);

  const getFather = (fatherName: string) => {
    return people.find(person => fatherName === person.name)?.name;
  };

  const getMother = (motherName: string) => {
    return people.find(person => motherName === person.name)?.name;
  };

  const peopleWithParents: PersonWithParents[] = people
    .map(person => ({
      ...person,
      father: getFather(person.fatherName) || '-',
      mother: getMother(person.motherName) || '-',
    }));

  return (
    <div className="column is-three-fifths box m-4">
      <table
        className="table
      is-bordered
      is-narrow
      is-hoverable
      is-fullwidth
      has-background-warning-light"
      >
        <thead>
          <tr>
            <th className="has-text-black-bis
             has-background-warning-dark"
            >
              <abbr title="name">Name</abbr>
            </th>
            <th className="has-text-black-bis
             has-background-warning-dark"
            >
              <abbr title="sex">Sex</abbr>
            </th>
            <th className="has-text-black-bis
             has-background-warning-dark"
            >
              <abbr title="born">Born</abbr>
            </th>
            <th className="has-text-black-bis
             has-background-warning-dark"
            >
              <abbr title="died">Died</abbr>
            </th>
            <th className="has-text-black-bis
             has-background-warning-dark"
            >
              <abbr title="mother">Mother</abbr>
            </th>
            <th className="has-text-black-bis
             has-background-warning-dark"
            >
              <abbr title="father">Father</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {peopleWithParents.map(person => (

            <PeopleRow person={person} />
          ))}
        </tbody>
      </table>

    </div>
  );
};
