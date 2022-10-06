import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../context';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const people = useContext(PeopleContext);
  const { personSlug = '' } = useParams();

  const findParents = useCallback((findedName: string | null) => {
    if (!findedName) {
      return '-';
    }

    const parent = people.find(({ name }) => name === findedName);

    return (
      parent
        ? (<PersonLink person={parent} />)
        : (<>{findedName}</>)
    );
  }, []);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': personSlug === slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParents(motherName)}</td>
      <td>{findParents(fatherName)}</td>
    </tr>
  );
};
