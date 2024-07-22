import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SexType } from '../types/SexType';

type Props = {
  name?: string;
  slug?: string;
  sex: string;
};

export const CustomLink: React.FC<Props> = ({ name, slug, sex }) => {
  return slug ? (
    <Link
      className={classNames({
        'has-text-danger': sex === SexType.female,
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  ) : (
    <span>{name}</span>
  );
};
