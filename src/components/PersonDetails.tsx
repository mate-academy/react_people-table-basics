import React from 'react';
import { useParams } from 'react-router-dom';

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string;
  fatherName: string;
}

interface PersonDetailsProps {
  people: Person[];
}

export const PersonDetails: React.FC<PersonDetailsProps> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const person = people.find(p => p.name === slug);

  if (!person) {
    return <p>Please select a tab</p>;
  }

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Sex: {person.sex}</p>
      <p>Born: {person.born}</p>
      <p>Died: {person.died}</p>
      <p>Mother: {person.motherName || '-'}</p>
      <p>Father: {person.fatherName || '-'}</p>
    </div>
  );
};
