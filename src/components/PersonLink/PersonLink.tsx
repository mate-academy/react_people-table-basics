import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
  getParent: (parentName: string | null) => ReactNode;
};

export const PersonLink: React.FC<Props> = ({
  person,
  getParent,
}) => {
  const { slug: selectedPersonSlug } = useParams();

  return (
    <tbody>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': selectedPersonSlug === person.slug,
        })}
      >
        <td>
          <Link
            to={`/people/${person.slug}`}
            className={classNames({
              'has-text-danger': person.sex === 'f',
            })}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{getParent(person.motherName)}</td>
        <td>{getParent(person.fatherName)}</td>
      </tr>
    </tbody>
  );
};
