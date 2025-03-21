import React, { useState, useEffect } from 'react';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  isSelected?: boolean;
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <div className="section">
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
