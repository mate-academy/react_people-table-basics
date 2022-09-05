import classnames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  name: string,
  people: Person[],
};

export const PersonLink: FC<Props> = ({ name, people }) => {
  const person = people.find(el => el.name === name);

  if (!person) {
    return (
      <>
        {name}
      </>
    );
  }

  return (
    <Link
      to={`../${person.slug}`}
      className={classnames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
