import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export const PersonDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople().then(peopleData => {
      setPeople(peopleData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const person = people.find(p => p.slug === slug);

  if (!person) {
    return (
      <div>
        <h1 className="title">Person not found</h1>
        <Link to="/people">Back to People</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="title">{person.name}</h1>
      <div className="content">
        <p>
          <strong>Sex:</strong> {person.sex}
        </p>
        <p>
          <strong>Born:</strong> {person.born}
        </p>
        <p>
          <strong>Died:</strong> {person.died}
        </p>
        <p>
          <strong>Mother:</strong> {person.motherName || '-'}
        </p>
        <p>
          <strong>Father:</strong> {person.fatherName || '-'}
        </p>
      </div>
      <Link to="/people" className="button">
        Back to People
      </Link>
    </div>
  );
};
