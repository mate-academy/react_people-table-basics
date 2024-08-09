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

enum Sex {
  male = 'm',
  female = 'f',
}

export const Person: React.FC<Props> = ({ person, people, findSlug }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const location = useLocation();

  const getGenderClassName = (parentName: string | null) => {
    const parent = people.find(personage => personage.name === parentName);

    if (parent?.sex === Sex.female) {
      return 'has-text-danger';
    }

    if (parent?.sex === Sex.male) {
      return '';
    }

    return;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': location.pathname.includes(slug),
      })}
    >
      <td>
        <a
          className={classNames({ 'has-text-danger': sex === Sex.female })}
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
