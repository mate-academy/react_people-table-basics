import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
}

function getSlug(person: Person): string {
  return person.name.toLowerCase().replace(/\s+/g, '-') + '-' + person.born;
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
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
              const personSlug = getSlug(person);

              const isSelected = slug === personSlug;

              let motherCell: React.ReactNode = '-';

              if (person.motherName) {
                const mother = people.find(p => p.name === person.motherName);

                if (mother) {
                  const motherSlug = getSlug(mother);

                  motherCell = (
                    <Link
                      to={`/people/${motherSlug}`}
                      className={mother.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {mother.name}
                    </Link>
                  );
                } else {
                  motherCell = person.motherName;
                }
              }

              let fatherCell: React.ReactNode = '-';

              if (person.fatherName) {
                const father = people.find(p => p.name === person.fatherName);

                if (father) {
                  const fatherSlug = getSlug(father);

                  fatherCell = (
                    <Link
                      to={`/people/${fatherSlug}`}
                      className={father.sex === 'm' ? 'has-text-danger' : ''}
                    >
                      {father.name}
                    </Link>
                  );
                } else {
                  fatherCell = person.fatherName;
                }
              }

              const nameLink = (
                <Link
                  to={`/people/${personSlug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              );

              return (
                <tr
                  key={personSlug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : ''}
                >
                  <td>{nameLink}</td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{motherCell}</td>
                  <td>{fatherCell}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
