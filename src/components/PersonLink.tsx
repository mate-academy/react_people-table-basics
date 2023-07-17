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
}) => {
  const female = 'f';
  const notSetValue = '-';

  return (
    <>
      {slug ? (
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === female,
          })}
        >
          {name}
        </Link>
      ) : (
        <span>
          {name || notSetValue}
        </span>
      )}
    </>
  );
};
