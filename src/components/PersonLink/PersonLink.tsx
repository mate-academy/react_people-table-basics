import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  name: string;
  sex: string;
  to: string;
};

export function PersonLink({ name, sex, to }: Props) {
  return (
    <Link
      to={`/people/${to}`}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
}
