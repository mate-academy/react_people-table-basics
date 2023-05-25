import classNames from 'classnames';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PeopleType } from '../../Type/People';

type Props = {
  person: PeopleType;
};

type LinkProps = {
  person: PeopleType;
};

export const PersonLink: FC<LinkProps> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};

export const Person: FC<Props> = ({ person }) => {
  // TODO change const display
  const {
    slug, sex, born, died, mother, father, motherName, fatherName,
  }
    = person;
  const selectedTodo = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedTodo.personId,
      })}
      key={slug}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName}</td>
    </tr>
  );
};
