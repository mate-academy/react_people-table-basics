import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleContext } from '../../PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { peopleList } = useContext(PeopleContext);
  const { slug } = useParams();

  const selectedPerson = person.slug === slug;
  const mother = peopleList.find(m => m.name === person.motherName);
  const father = peopleList.find(f => f.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson,
      })}
    >
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </a>
      </td>

      <td>
        {person.sex}
      </td>

      <td>
        {person.born}
      </td>

      <td>
        {person.died}
      </td>

      {mother ? (
        <td>
          <a href={`#/people/${mother.slug}`} className="has-text-danger">
            {person.motherName}
          </a>
        </td>
      ) : (
        <td>
          {!person.motherName ? '-' : person.motherName}
        </td>
      )}

      {father ? (
        <td>
          <a href={`#/people/${father.slug}`}>
            {person.fatherName}
          </a>
        </td>
      ) : (
        <td>
          {!person.fatherName ? '-' : person.fatherName}
        </td>
      )}
    </tr>
  );
};
