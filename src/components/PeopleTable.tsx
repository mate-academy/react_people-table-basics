import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug: urlSlug } = useParams();

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
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const findMother = people.find(p => p.name === motherName);
          const findFather = people.find(p => p.name === fatherName);

          const mother = findMother ? (
            <PersonLink
              name={motherName}
              sex={findMother.sex}
              slug={findMother.slug}
            />
          ) : motherName;

          const father = findFather ? (
            <PersonLink
              name={fatherName}
              sex={findFather.sex}
              slug={findFather.slug}
            />
          ) : fatherName;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': slug === urlSlug,
              })}
            >
              <td>
                <Link
                  to={`${slug}`}
                  className={cn({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{mother || '-'}</td>
              <td>{father || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
