/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';

const PersonLink = ({ slug, sex, name }: Record<string, string>) => {
  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};

const Table = ({ people }: { people: Person[] }) => {
  const param = useParams();

  const computedPeople = useMemo(
    () =>
      people.map(el => {
        const mother = people.find(person => person.name === el.motherName);
        const father = people.find(person => person.name === el.fatherName);

        return { ...el, mother, father };
      }),
    [people],
  );

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
        {computedPeople.map(
          ({
            name,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
            slug,
          }) => {
            return (
              <tr
                data-cy="person"
                key={name}
                className={cn({
                  'has-background-warning': slug === param.slug,
                })}
              >
                <td>
                  <PersonLink slug={slug} sex={sex} name={name} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother ? (
                    <PersonLink
                      slug={mother.slug}
                      sex={mother.sex}
                      name={mother.name}
                    />
                  ) : (
                    motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink
                      slug={father.slug}
                      sex={father.sex}
                      name={father.name}
                    />
                  ) : (
                    fatherName || '-'
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};

export default Table;
