import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);
  const { peopleId } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    peopleId || null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPeople() {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError(true);
      }
    }

    fetchPeople();
  }, []);

  useEffect(() => {
    if (peopleId) {
      setSelectedPerson(peopleId);
    }
  }, [peopleId]);

  const handleSelect = (slug: string) => {
    navigate(`/people/${slug}`);
  };

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      {people === null && <Loader />}
      {error && <p className="has-text-danger">Something went wrong</p>}
      {people && people.length === 0 && (
        <p>There are no people on the server</p>
      )}

      {people && people.length > 0 && (
        <PeopleTable
          people={people}
          selectedPerson={selectedPerson}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};
