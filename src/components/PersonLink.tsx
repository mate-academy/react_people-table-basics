import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { name, slug, sex },
}) => {
  return (
    <a
      className={classNames({ 'has-text-danger': sex === 'f' })}
      href={`#/people/${slug}`}
    >
      {name}
    </a>
  );
};
