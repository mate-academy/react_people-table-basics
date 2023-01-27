import cn from 'classnames';
import { FC, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

export interface Props {
  person: Person;
  slug: string;
}

export const PersonLink: FC<Props> = memo(
  ({ person, slug }) => {
    const isSelected = useMemo(() => slug === person.slug, [slug, person]);

    return (
      <tr
        className={cn(
          { 'has-background-warning': isSelected },
        )}
        data-cy="person"
      >
        <td>
          <Link
            className={cn({ 'has-text-danger': person.sex === 'f' })}
            to={`/people/${person.slug}`}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {person.mother
            ? (
              <Link
                className="has-text-danger"
                to={`/people/${person.mother.slug}`}
              >
                {person.motherName}
              </Link>
            )
            : person.motherName || '-'}
        </td>
        <td>
          {person.father
            ? (
              <Link
                className="class"
                to={`/people/${person.father.slug}`}
              >
                {person.fatherName}
              </Link>
            )
            : person.fatherName || '-'}
        </td>
      </tr>
    );
  },
);
