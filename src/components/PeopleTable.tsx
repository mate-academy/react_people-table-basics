import { useParams } from 'react-router-dom';
import { PeopleTableProps } from '../types';
import PersonLink from './PersonLink';
// import React, { useState } from 'react';

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  peopleMap,
  // highlightedSlug,
}) => {
  // const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // const handleRowClick = (slug: string) => {
  //   setSelectedSlug(slug);
  // };
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
        {people.map(person => {
          const isSelected = slug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isSelected ? 'has-background-warning' : ''}
              // onClick={() => handleRowClick(person.slug)}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <PersonLink
                  personName={person.name}
                  peopleMap={peopleMap}
                  // onClick={slug => handleRowClick(slug)}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  personName={person.motherName}
                  peopleMap={peopleMap}
                />
              </td>
              <td>
                <PersonLink
                  personName={person.fatherName}
                  peopleMap={peopleMap}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
