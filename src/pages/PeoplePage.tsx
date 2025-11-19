import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PeopleTable } from '../component/PeopleTable/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(result => result.json())
      .then((data: Person[]) => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSelect = (selectedSlug: string) => {
    navigate(`/people/${selectedSlug}`);
  };

  if (loading) {
    return <Loader data-cy="loader" />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">there are no people on the server</p>;
  }

  return (
    <div>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        selectedSlug={slug}
        onSelect={handleSelect}
      />
    </div>
  );
};
