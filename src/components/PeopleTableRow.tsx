import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PeopleTableRowProps {
  person: Person,
}

export const PeopleTableRow: FC<PeopleTableRowProps> = ({
  person,
}) => {
  const { slug } = useParams();
  const isSelectedPerson = slug === person.slug;
  const isWoman = person.sex === 'f';

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': isSelectedPerson,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': isWoman,
          })}
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
              to={`/people/${person.mother.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )
          : (person.motherName || '-')}
      </td>
      <td>
        {person.father
          ? (
            <Link to={`/people/${person.father.slug}`}>
              {person.fatherName}
            </Link>
          )
          : (person.fatherName || '-')}
      </td>
    </tr>
  );
};
