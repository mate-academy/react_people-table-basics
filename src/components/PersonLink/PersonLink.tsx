import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  sex: string,
  name: string,
  slug?: string,
};

export const PersonLink: React.FC<Props> = ({ sex, name, slug }) => {
  const isPersonIsFemale = (gender: string) => {
    if (gender === 'f') {
      return true;
    }

    return false;
  };

  const isFemale = isPersonIsFemale(sex);

  return (
    <Link
      className={classNames({
        'has-text-danger': isFemale,
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
