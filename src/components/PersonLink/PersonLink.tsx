import React from "react";
import { Person } from "../../types";
import { Link, useParams } from "react-router-dom";
import cn from 'classnames';

type Props = {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person, mother, father }) => {
  const {name, sex, born, died, fatherName, motherName, slug} = person;

  const { userFromId } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': userFromId === slug})}
    >
      <td>
        <Link
        className={cn({ 'has-text-danger': sex === 'f' })}
        to={`../${slug}`}
      >
        {name}
      </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={`../${mother.slug}`}
          >
            {motherName}
          </Link>
        ) : motherName ? motherName : '-'}
      </td>

      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {fatherName}
          </Link>
        ) : fatherName ? fatherName : '-'}
      </td>
    </tr>
  );
};
