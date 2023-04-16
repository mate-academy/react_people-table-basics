import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

export type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonLink: FC<Props> = ({ person, selectedPerson }) => {
  const { name, sex, slug } = person;
  const isFemale = sex === 'f';
  const isSelected = (human: Person) => human.slug === selectedPerson;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': isFemale },
      )}
      to={isSelected(person) ? '../' : `../${slug}`}
    >
      {name}
    </Link>
  );
};
