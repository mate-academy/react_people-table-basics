import React, { useEffect, useState } from 'react';
import { IPeople } from '../../types/types';
import { PersonRow } from '../5_PersonRow/PersonRow';
import './people.scss';

interface Props {
  people: IPeople[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [analyticsPeople, setAnalyticsPeople] = useState<IPeople[]>(people);

  const sorted = () => {
    const sortPeople = people.map(person => {
      return {
        ...person,
        mother: people.filter(item => item.name === person.motherName),
        father: people.filter(item => item.name === person.fatherName),
      };
    });

    setAnalyticsPeople(sortPeople);
  };

  useEffect(() => {
    sorted();
  }, []);

  return (
    <table className="PeopleTable">
      <thead>
        <th>Name</th>
        <th>Sex</th>
        <th>Mather name</th>
        <th>Father name</th>
        <th>Born</th>
        <th>Died</th>
        <th>Slug</th>
      </thead>
      <tbody>
        {analyticsPeople.map((person: IPeople) => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
