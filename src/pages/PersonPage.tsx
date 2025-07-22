import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PersonPage: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <h2 className="title">Invalid person</h2>;
  }

  const person = people.find(p => p.slug === slug);

  if (!person) {
    return <h2 className="title">Person not found</h2>;
  }

  return (
    <div className="box">
      <h1 className="title">{person.name}</h1>
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
  );
};
