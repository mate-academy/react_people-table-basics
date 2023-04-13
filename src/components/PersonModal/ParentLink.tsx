import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface ParentLinkProps {
  parentName: string | null;
  people: Person[];
}

export const ParentLink: React.FC<ParentLinkProps> = ({
  parentName,
  people,
}) => {
  if (!parentName) {
    return <>-</>;
  }

  const parentPerson = people.find((p) => p.name === parentName);

  if (parentPerson) {
    return (
      <Link
        to={`/people/${parentPerson.slug}`}
        className={classNames({ 'has-text-danger': parentPerson.sex === 'f' })}
      >
        {parentName}
      </Link>
    );
  }

  return <>{parentName}</>;
};
