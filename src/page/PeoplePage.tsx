import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/getPeople';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const selectedPerson = people.find(p => p.slug === slug);

  return (
    <div className="section">
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} selected={selectedPerson} />
    </div>
  );
};
