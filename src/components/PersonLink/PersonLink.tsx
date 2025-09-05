import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  personName: string | null;
  allPeople: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, allPeople }) => {
  const personsParent = allPeople.find(per => per.name === personName);

  return (
    <>
      {personsParent ? (
        <Link
          className={classNames({
            'has-text-danger': personsParent.sex === 'f',
          })}
          to={`/people/${personsParent.slug}`}
        >
          {personName}
        </Link>
      ) : (
        personName
      )}
    </>
  );
};
