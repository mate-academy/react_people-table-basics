import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  slug: string;
  name: string;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ slug, name, sex = 'm' }) => {
  const isWomen = sex === 'f';

  return (
    <Link to={`../${slug}`} className={cn({ 'has-text-danger': isWomen })}>
      {name}
    </Link>
  );
};
