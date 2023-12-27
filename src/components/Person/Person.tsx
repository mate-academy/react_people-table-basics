import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person, Sex } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    name, slug, sex, born, died, motherName, fatherName,
  } = person;

  const styleRed = classNames({
    'has-text-danger': person.sex === Sex.Female,
  });

  const hasMother = people
    .find(mother => mother.name === person.motherName);
  const hasFather = people
    .find(father => father.name === person.fatherName);

  return (
    <>
      <td>
        <Link
          to={`./${slug}`}
          className={styleRed}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td className={styleRed}>
        {hasMother
          ? (
            <Link
              to={`./${hasMother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          ) : (
            motherName ?? '-'
          )}
      </td>

      <td>
        {hasFather
          ? (
            <Link
              to={`./${hasFather.slug}`}
            >
              {fatherName}
            </Link>
          ) : (
            fatherName ?? '-'
          )}
      </td>
    </>
  );
};
