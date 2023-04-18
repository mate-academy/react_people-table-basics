import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

export interface Props {
  person: Person,
  mother: string | Person,
  father: string | Person,
}

export const PersonLink: FC<Props> = ({
  person,
  mother,
  father,
}) => {
  const {
    name, sex, born, died, slug,
  } = person;

  return (
    <>
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {typeof mother === 'string' ? mother : (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        )}
      </td>
      <td>
        {typeof father === 'string' ? father : (
          <Link
            to={`../${father.slug}`}
          >
            {father.name}
          </Link>
        )}
      </td>
    </>
  );
};
