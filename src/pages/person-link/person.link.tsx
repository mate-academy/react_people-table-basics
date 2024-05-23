/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import { PersonLinkProps } from '../../types/Person.link';

export const PersonLink: React.FC<
PersonLinkProps & { onClick?: () => void }
> = ({ person, children, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const foundPerson = person ? person : null;

  if (foundPerson) {
    return (
      <Link
        to={`/people/${foundPerson.slug}`}
        className={foundPerson.sex === 'f' ? 'has-text-danger' : ''}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  } else {
    return <>{children}</>;
  }
};
