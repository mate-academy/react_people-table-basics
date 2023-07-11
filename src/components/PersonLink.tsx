import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  slug: string | null;
  name: string | null;
  sex: string | null;
}

export const PersonLink: React.FC <Props> = ({
  slug,
  name,
  sex,
}) => (
  <>
    {slug ? (
      <Link
        to={`/people/${slug}`}
        className={classNames({
          'has-text-danger': sex === 'f',
        })}
      >
        {name}
      </Link>
    ) : (
      <span>
        {name || '-'}
      </span>
    )}
  </>
);
