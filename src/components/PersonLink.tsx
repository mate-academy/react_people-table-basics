import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  selectedSlug: string;
};

export const PersonLink: FC<Props> = (props) => {
  const { person, selectedSlug } = props;
  const isSelected = selectedSlug === person.slug;

  return (
    <tr
      data-cy="person"
      className={isSelected
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && (person.mother ? (
          <NavLink
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </NavLink>
        ) : (person.motherName))}
        {!person.motherName && (
          <>-</>
        )}
      </td>
      <td>
        {person.fatherName && (person.father ? (
          <NavLink
            to={`/people/${person.father.slug}`}
          >
            {person.father.name}
          </NavLink>
        ) : (person.fatherName))}
        {!person.fatherName && (
          <>-</>
        )}
      </td>
    </tr>
  );
};
