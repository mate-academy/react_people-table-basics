import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person,
  mother: JSX.Element | string,
  father: JSX.Element | string,
}

export const PersonInfo: React.FC<Props> = ({
  person,
  mother,
  father,
}) => {
  const {
    sex,
    born,
    died,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td><PersonLink person={person} /></td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother}
      </td>
      <td>
        {father}
      </td>
    </tr>
  );
};
