import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  handleClick: (slug: string) => void;
};

export const PersonLink: React.FC<Props> = ({ person, handleClick }) => {
  const { name, sex, slug } = person;

  return (
    <a
      className={classNames({ 'has-text-danger': sex === 'f' })}
      href={`#/people/${slug}`}
      onClick={() => handleClick(person.slug)}
    >
      {name}
    </a>
  );
};
