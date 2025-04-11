import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { name, born, sex },
}) => {
  const arrForLink = name.split(' ').map(str => str.toLowerCase());

  arrForLink.push(`${born}`);

  const link = arrForLink.join('-');

  return (
    <div>
      <Link
        to={`../${link}`}
        className={classNames(sex === 'f' && 'has-text-danger')}
      >
        {name}
      </Link>
    </div>
  );
};
