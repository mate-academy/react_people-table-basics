import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink/PersonLink';

export const PersonDetailsPage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const person = people.find(p => p.slug === slug);

  if (!person) {
    return <h1 className="title">Person not found</h1>;
  }

  const children = people.filter(
    p => p.fatherName === person.name || p.motherName === person.name,
  );

  return (
    <div className="section">
      <h1 className="title">{person.name}</h1>

      <div className="content">
        <p>
          <strong>Sex:</strong> {person.sex === 'm' ? 'Male' : 'Female'}
        </p>

        <p>
          <strong>Born:</strong> {person.born}
        </p>

        <p>
          <strong>Died:</strong> {person.died || '–'}
        </p>

        <p>
          <strong>Mother:</strong>{' '}
          <PersonLink name={person.motherName} people={people} />
        </p>

        <p>
          <strong>Father:</strong>{' '}
          <PersonLink name={person.fatherName} people={people} />
        </p>

        <p>
          <strong>Children:</strong>
        </p>

        {children.length > 0 ? (
          <ul>
            {children.map(child => (
              <li key={child.slug}>
                <PersonLink name={child.name} people={people} />
              </li>
            ))}
          </ul>
        ) : (
          <p>–</p>
        )}
      </div>
    </div>
  );
};
