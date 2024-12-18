import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { findPersonByName } from '../utils/findPersonByName';

interface Props {
  person: Person;
  people: Person[];
}

type ParentLinkProps = {
  parentName: string | null;
  parent: { slug: string } | null;
  className?: string;
};

const ParentLink: React.FC<ParentLinkProps> = ({
  parentName,
  parent,
  className,
}) =>
  parent ? (
    <Link to={`/people/${parent.slug}`} className={className || ''}>
      {parentName}
    </Link>
  ) : (
    <>{parentName || '-'}</>
  );

export const PersonInfo: FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams<{ personSlug: string }>();

  const mother = findPersonByName(people, person.motherName);
  const father = findPersonByName(people, person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === personSlug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <ParentLink
          parentName={person.motherName}
          parent={mother ?? null}
          className="has-text-danger"
        />
      </td>
      <td>
        <ParentLink parentName={person.fatherName} parent={father ?? null} />
      </td>
    </tr>
  );
};
