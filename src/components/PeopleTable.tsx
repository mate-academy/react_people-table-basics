import { useEffect } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';
import { Loader } from './Loader';

type Props = {
  people: Person[];
  selectedPerson: string | null;
  setSelectedPerson: (slug: string | null) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  setSelectedPerson,
}) => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('/people/')) {
        setSelectedPerson(hash.split('/')[2]);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setSelectedPerson]);

  if (people.length === 0) {
    return <Loader />;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <tr
            key={person.slug}
            data-cy={`personRow-${person.slug}`}
            className={selectedPerson === person.slug ? 'has-background-warning' : ''}
          >
            <td data-cy={`personName-${person.slug}`}>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={people.find((p) => p.name === person.motherName) || undefined}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  person={people.find((p) => p.name === person.fatherName) || undefined}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
