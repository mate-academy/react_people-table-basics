import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

export const PersonDetails: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const person = people.find(p => p.slug === slug);

  if (!person) {
    return (
      <div>
        <h2 className="title">Person not found</h2>
        <Link to="/people" className="button is-link">
          Back to People Page
        </Link>
      </div>
    );
  }

  const { name, sex, born, died, mother, father } = person;

  return (
    <div>
      <h2 className="title">{name}</h2>
      <p>
        <strong>Sex:</strong> {sex}
      </p>
      <p>
        <strong>Born:</strong> {born}
      </p>
      <p>
        <strong>Died:</strong> {died || 'Still alive'}
      </p>
      <p>
        <strong>Mother:</strong>{' '}
        {mother ? (
          <Link to={`/people/${mother.slug}`}>{mother.name}</Link>
        ) : (
          'Unknown'
        )}
      </p>
      <p>
        <strong>Father:</strong>{' '}
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          'Unknown'
        )}
      </p>
      <Link to="/people" className="button is-link">
        Back to People Page
      </Link>
    </div>
  );
};
