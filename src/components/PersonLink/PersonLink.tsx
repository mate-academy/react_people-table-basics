/* eslint-disable no-nested-ternary */
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedSlug: string | undefined,
};

export const PersonLink: React.FC<Props> = ({ person, selectedSlug }) => {
  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': selectedSlug === person.slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          replace
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother?.slug ? (
          <Link
            className="has-text-danger"
            to={`/people/${person.mother?.slug}`}
            replace
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? person.motherName : '-'}
      </td>

      <td>
        {person.father?.slug ? (
          <Link
            to={`/people/${person.father?.slug}`}
            replace
          >
            {person.fatherName}
          </Link>
        ) : person.fatherName ? person.fatherName : '-'}
      </td>
    </tr>
  );
};
