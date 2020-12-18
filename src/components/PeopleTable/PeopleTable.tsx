import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person, ServerIPerson } from '../../api/interface';
import { Loader } from '../Loader';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        result.forEach((person: ServerIPerson) => {
          setPeople((prev) => [
            {
              name: person.name,
              sex: person.sex,
              born: person.born,
              died: person.died,
              father: person.fatherName === null
                ? undefined
                : result.find((father: ServerIPerson) => father.name === person.fatherName),
              mother: person.motherName === null
                ? undefined
                : result.find((mother: ServerIPerson) => mother.name === person.motherName),
            },
            ...prev,
          ]);
        });
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  if (isLoading) {
    return (<Loader />);
  }

  return (
    <table
      className="PeopleTable"
    >
      <thead>
        <tr>
          <td>Name</td>
          <td>Sex</td>
          <td>Born</td>
          <td>Died</td>
          <td>Father</td>
          <td>Mother</td>
        </tr>
      </thead>
      <tbody>
        {error
          ? (
            <p>People not found</p>
          )
          : people.map(person => (
            <PersonRow
              key={person.name}
              person={person}
            />
          ))}
      </tbody>
    </table>
  );
};
