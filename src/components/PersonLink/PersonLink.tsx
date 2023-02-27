import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const isWoman = sex === 'f';

  return (
    <Link to={`../${slug}`} className={cn({ 'has-text-danger': isWoman })}>
      {name}
    </Link>
  );
};
