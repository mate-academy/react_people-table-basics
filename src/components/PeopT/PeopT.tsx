import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

type Props = {
  people: Person[];
};

function findParent(people: Person[], parentName: string | null) {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return (
      <Link
        to={`../${parent.slug}`}
        className={cn({ 'has-text-danger': parent.sex === 'f' })}
      >
        {parent.name}
      </Link>
    );
  }

  return parentName || '-';
}

export const PeopT: React.FC<Props> = ({ people }) => {
  const { slug: selected } = useParams();

  return (
    <table
      data-cy="PeopT"
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
        {people.map(({
          name,
          sex,
          born,
          died,
          motherName,
          fatherName,
          slug,
        }) => (
          <tr
            data-cy="person"
            className={cn(
              { 'has-background-warning': selected === slug },
            )}
            key={slug}
          >
            <td>
              <Link
                to={`../${slug}`}
                className={cn({ 'has-text-danger': sex === 'f' })}
              >
                {name}
              </Link>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>{findParent(people, motherName)}</td>
            <td>{findParent(people, fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
