import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PeopleItem: FC<Props> = ({ person }) => {
  const { slug: slugParam } = useParams();
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    father,
    mother,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === slugParam })}
    >
      <td>
        <Link to={`/people/${slug}`} className={classNames({ 'has-text-danger': sex === 'f' })}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td><PersonLink person={mother} personName={motherName} /></td>
      <td><PersonLink person={father} personName={fatherName} /></td>
    </tr>
  );
};
