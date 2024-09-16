import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  sex: string,
  name: string,
  slug: string,
}

export const PersonLink: React.FC<Props> = ({
  name,
  sex,
  slug,
}) => (
  <Link
    to={`../${slug}`}
    className={classNames({
      'has-text-danger': sex === 'f',
    })}
  >
    {name}
  </Link>
);
