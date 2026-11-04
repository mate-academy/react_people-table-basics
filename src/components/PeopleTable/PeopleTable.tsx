import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { slug } = useParams();

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
        {peoples?.map(people => {
          const motherIsUser = peoples.find(p => p.name === people.motherName);
          const fatherIsUser = peoples.find(p => p.name === people.fatherName);

          return (
            <tr
              data-cy="person"
              key={people.slug}
              className={people.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink
                  name={people.name}
                  slug={people.slug}
                  sex={people.sex}
                />
              </td>

              <td>{people.sex}</td>
              <td>{people.born}</td>
              <td>{people.died}</td>
              <td>
                {motherIsUser ? (
                  <PersonLink
                    name={motherIsUser.name}
                    slug={motherIsUser.slug}
                    sex={motherIsUser.sex}
                  />
                ) : (
                  people.motherName || '-'
                )}
              </td>
              <td>
                {fatherIsUser ? (
                  <PersonLink
                    name={fatherIsUser.name}
                    slug={fatherIsUser.slug}
                    sex={fatherIsUser.sex}
                  />
                ) : (
                  people.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
