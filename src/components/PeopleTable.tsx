import { useState } from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: urlSlug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    urlSlug || null,
  );
  const navigate = useNavigate();

  const handlePersonClick = (slug: string) => {
    setSelectedPerson(slug);
    navigate(`/people/${slug}`, { replace: true });
  };

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
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPerson,
              })}
              onClick={() => handlePersonClick(person.slug)}
            >
              <td>
                <PersonLink person={person} onClick={handlePersonClick} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} onClick={handlePersonClick} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} onClick={handlePersonClick} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
