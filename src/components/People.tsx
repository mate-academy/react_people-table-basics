import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { Person } from '../types';

export const People = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(slug);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) setSelectedSlug(slug);
  }, [slug]);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="section">
        <div className="container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </main>
    );
  }

  if (!people.length) {
    return (
      <main className="section">
        <div className="container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <PeopleTable
          people={people}
          selectedSlug={selectedSlug}
          onSelectPerson={setSelectedSlug}
        />
      </div>
    </main>
  );
};
