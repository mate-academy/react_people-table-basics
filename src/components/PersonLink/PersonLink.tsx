interface Props {
  name: string;
  people: Person[];
}
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

const PersonLink = ({ people, name }: Props) => {
  const currentPerson = people.find(person => person.name === name);

  if (!currentPerson) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${currentPerson.slug}`}
      className={classNames({ 'has-text-danger': currentPerson.sex === 'f' })}
    >
      {name}
    </Link>
  );
};

export default PersonLink;
