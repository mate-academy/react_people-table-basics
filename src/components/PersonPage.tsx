import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PersonPage = () => {
  const { slug } = useParams();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    getPeople().then(list => {
      const found = list.find(p => p.slug === slug);

      setPerson(found || null);
    });
  }, [slug]);

  if (!person) {
    return <h2 className="title">Person not found</h2>;
  }

  return (
    <>
      <h1 className="title">{person.name}</h1>
      <p>Born: {person.born}</p>
      <p>Died: {person.died}</p>
      <p>Sex: {person.sex}</p>
    </>
  );
};
