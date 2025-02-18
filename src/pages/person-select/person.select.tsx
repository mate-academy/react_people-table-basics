/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import { PersonLinkProps } from '../../types/Person.select';

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  children,
}) => {
  return (
    <>
      {person ? (
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
