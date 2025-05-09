import React, { useContext } from 'react';
import { Person } from '../person/person';
import { PeopleContext } from '../../store/peopleContext/peopleContext';

export const PeopleTable: React.FC = () => {
  const { people } = useContext(PeopleContext);
  const nameToSlug = people.reduce<Record<string, string>>((acc, item) => {
    return {
      ...acc,
      [item.name]: item.slug,
    };
  }, {});

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
          const { name, sex, born, fatherName, died, motherName, slug } =
            person;
          const fatherLinkSlug = fatherName && nameToSlug[fatherName];
          const motherLinkSlug = motherName && nameToSlug[motherName];

          return (
            <Person
              key={name + born}
              name={name}
              sex={sex}
              born={born}
              died={died}
              fatherLinkSlug={fatherLinkSlug}
              motherLinkSlug={motherLinkSlug}
              slug={slug}
              fatherName={fatherName}
              motherName={motherName}
            />
          );
        })}
      </tbody>
    </table>
  );
};
