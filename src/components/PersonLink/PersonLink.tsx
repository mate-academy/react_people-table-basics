import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  slug?: string;
  name?: string;
  sex?: string;
  mother?: Person;
  father?: Person;
};

export const PersonLink: React.FC<Props> = ({
  slug,
  name,
  sex,
  mother,
  father,
}) => {
  if (mother) {
    return (
      <Link className="has-text-danger" to={`${mother.slug}`}>
        {mother.name}
      </Link>
    );
  }

  if (father) {
    return <Link to={`${father.slug}`}>{father.name}</Link>;
  }

  return (
    <Link to={`${slug}`} className={cn({ 'has-text-danger': sex === 'f' })}>
      {name}
    </Link>
  );
};
