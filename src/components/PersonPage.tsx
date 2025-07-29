import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export function PersonPage() {
  const { slug } = useParams();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    getPeople().then(people => {
      const foundPerson = people.find(p => p.slug === slug);

      setPerson(foundPerson || null);
    });
  }, [slug]);

  if (!person) {
    return <div>Person is not found</div>;
  }

  return (
    <div>
      <h2>{person.name}</h2>
      <p>{person.sex}</p>
      <p>{person.born}</p>
      <p>{person.died}</p>
    </div>
  );
}
