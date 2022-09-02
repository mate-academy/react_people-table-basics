import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  human: Person;
};

export const PersonLink: React.FC<Props> = (props) => {
  const { human } = props;

  return (
    <Link
      to={`../${human.slug}`}
      className={classNames({
        'has-text-danger': human.sex === 'f',
      })}
    >
      {human.name}
    </Link>
  );
};
