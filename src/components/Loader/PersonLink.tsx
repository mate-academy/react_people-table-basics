import { Link, NavLink } from 'react-router-dom';
import { User } from '../../pages/PeoplePage';
import classNames from 'classnames';

interface Props {
  person?: User;
  name?: string;
  people?: User[];
  isNav?: boolean;
}

export const PersonLink: React.FC<Props> = ({
  person,
  name,
  people,
  isNav = false,
}) => {
  const displayName = person?.name ?? name;

  if (!displayName) {
    return <>-</>;
  }

  const target = person || people?.find(p => p.name === displayName);

  const linkClasses = classNames({
    'has-text-danger': target?.sex === 'f',
  });

  if (target?.slug) {
    return isNav ? (
      <NavLink to={`/people/${target.slug}`} className={linkClasses}>
        {displayName}
      </NavLink>
    ) : (
      <Link to={`/people/${target.slug}`} className={linkClasses}>
        {displayName}
      </Link>
    );
  }

  return <span className={linkClasses}>{displayName}</span>;
};
