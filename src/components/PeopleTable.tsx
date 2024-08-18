import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: urlSlug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    urlSlug || null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (urlSlug) {
      setSelectedPerson(urlSlug);
    }
  }, [urlSlug]);

  const handlePersonClick = (slug: string) => {
    setSelectedPerson(slug);
    navigate(`/people/${slug}`, { replace: true });
  };

  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            selectedPerson={selectedPerson}
            onPersonClick={handlePersonClick}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
