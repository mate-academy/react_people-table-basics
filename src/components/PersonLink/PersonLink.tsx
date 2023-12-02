/* eslint-disable no-nested-ternary */
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedSlug: string | undefined,
};

export const PersonLink: React.FC<Props> = ({ person, selectedSlug }) => {
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({ 'has-background-warning': selectedSlug === person.slug })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother?.slug ? (
          <a
            className="has-text-danger"
            href={`#/people/${person.mother?.slug}`}
          >
            {person.motherName}
          </a>
        ) : person.motherName ? person.motherName : '-'}
      </td>

      <td>
        {person.father?.slug ? (
          <a
            href={`#/people/${person.father?.slug}`}
          >
            {person.fatherName}
          </a>
        ) : person.fatherName ? person.fatherName : '-'}
      </td>
    </tr>
  );
};
