import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/Loader/PeopleTable';

export const PersonPage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    getPeople().then(loadedPeople => {
      setPeople(loadedPeople);
      setPerson(loadedPeople.find(p => p.slug === slug) || null);
    });
  }, [slug]);

  return (
    <div>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} selectedSlug={slug} />

      {!person && (
        <div className="notification is-warning">Person not found</div>
      )}
    </div>
  );
};
