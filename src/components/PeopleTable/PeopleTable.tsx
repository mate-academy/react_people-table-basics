import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/personLink';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
  loading: boolean;
};

export const PeopleTable: React.FC<Props> = ({ loading, people }) => {
  const [selectedPersonSlug, setSelectedPersonSlug] = useState('');
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!loading && (
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
      )}
      <tbody>
        {people?.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                (
                  slug
                    ? person.slug === slug
                    : person.slug === selectedPersonSlug
                )
                  ? 'has-background-warning'
                  : ''
              }
              onClick={() => setSelectedPersonSlug(person.slug)}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
