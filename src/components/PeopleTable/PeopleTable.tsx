import cn from 'classnames';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const peopleWithParents = useMemo(() => (
    people.map((person) => {
      const mother = people.find(({ name }) => person.motherName === name);
      const father = people.find(({ name }) => person.fatherName === name);

      return {
        ...person,
        mother,
        father,
      };
    })
  ), [people]);

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
        {peopleWithParents.map((person) => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
            mother,
            father,
          } = person;
          const href = `#/people/${slug}`;
          const motherHref = `#/people/${mother?.slug}`;
          const fatherHref = `#/people/${father?.slug}`;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <a
                  href={href}
                  className={cn({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </a>
              </td>
              <td>
                {sex}
              </td>
              <td>
                {born}
              </td>
              <td>
                {died}
              </td>
              <td>
                {!mother && (motherName || '-')}
                {mother && (
                  <a href={motherHref} className="has-text-danger">
                    {mother.name}
                  </a>
                )}
              </td>
              <td>
                {!father && (fatherName || '-')}
                {father && (
                  <a href={fatherHref}>
                    {father.name}
                  </a>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
