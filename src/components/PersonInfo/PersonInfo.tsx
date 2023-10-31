import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../store/PeopleContext';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);
  const { slug } = useParams();

  const findPersoninList = (parentName: string | null) => {
    return people.find(per => per.name === parentName) || null;
  };

  const mother = findPersoninList(person.motherName);
  const father = findPersoninList(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
