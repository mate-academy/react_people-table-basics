import cn from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleType } from '../../Type/People';
import { PersonLink } from '../PersonLink';

type Props = {
  person: PeopleType;
};

export const Person: FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;
  const selectedTodo = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === selectedTodo.personId,
      })}
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
