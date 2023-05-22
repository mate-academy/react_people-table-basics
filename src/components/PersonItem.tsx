/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import classnames from 'classnames';
// import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const [selectedPerson, setSelectedPerson] = useState('');
  // const { PersonSlug = '' } = useParams();

  const handleClick = (slug: string) => {
    setSelectedPerson((prevSelectedPerson) => {
      return prevSelectedPerson !== slug ? slug : '';
    });
  };

  return (
    <tr
      data-cy="person"
      className={classnames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} handleClick={handleClick} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>-</td>
      <td>-</td>
    </tr>
  );
};
