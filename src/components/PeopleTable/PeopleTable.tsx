import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink/PersonLink';

type PeopleTableProps = {
  people: Person[],
};

export const PeopleTable: React.FC<PeopleTableProps> = (
  { people },
) => {
  const { personSlug } = useParams<{ personSlug?: string } >();
  const [selectedPersonSlug, setSelectedPersonSlug]
    = useState<string | null>(personSlug !== undefined ? personSlug : null);

  const handleSelectedPerson = (slug: string) => {
    const findSelectedPerson = people
      .find(person => person.slug === slug);

    setSelectedPersonSlug(findSelectedPerson !== undefined
      ? findSelectedPerson.slug : null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPersonSlug === null) {
      navigate('/people');
    } else {
      navigate(`/people/${selectedPersonSlug}`);
    }
  }, [selectedPersonSlug]);

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === selectedPersonSlug
              ? 'has-background-warning' : undefined}
          >
            <PersonLink
              person={person}
              handleSelectedPerson={handleSelectedPerson}
            />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother
              ? (
                <PersonLink
                  person={person.mother}
                  handleSelectedPerson={handleSelectedPerson}
                />
              )
              : (
                <td>
                  {person.motherName !== null
                    ? person.motherName : '-'}
                </td>
              )}
            {person.father
              ? (
                <PersonLink
                  person={person.father}
                  handleSelectedPerson={handleSelectedPerson}
                />
              )
              : (
                <td>
                  {person.fatherName !== null
                    ? person.fatherName : '-'}
                </td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
