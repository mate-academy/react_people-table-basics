import React from 'react';
import { useLocation } from 'react-router-dom';
import { Person as PersonType } from '../types';
import classNames from 'classnames';
import { ParentName } from './ParentName/ParentName';

interface Props {
  person: PersonType;
  people: Array<{ name: string; sex: string; slug: string }>;
  findSlug: (parentName: string | null) => string | undefined;
}

export const Person: React.FC<Props> = ({ person, people, findSlug }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const location = useLocation();

  const getGenderClassName = (parentName: string | null) => {
    const parent = people.find(el => el.name === parentName);

    if (parent?.sex === 'f') {
      return 'has-text-danger';
    }

    if (parent?.sex === 'm') {
      return '';
    }

    return undefined;
  };

  return (
    <tr
      data-cy="person"
      className={
        location.pathname.includes(slug) ? 'has-background-warning' : undefined
      }
    >
      <td>
        <a
          className={classNames({ 'has-text-danger': sex === 'f' })}
          href={`#/people/${slug}`}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {
        <ParentName
          parentName={motherName}
          findSlug={findSlug}
          getGenderClassName={getGenderClassName}
        />
      }

      {
        <ParentName
          parentName={fatherName}
          findSlug={findSlug}
          getGenderClassName={getGenderClassName}
        />
      }
    </tr>
  );
};
