import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { EnumPersonType } from './types/EnumPersonType';
import { Person } from './types/Person';

interface PersonLinkProps {
  person: Person;
  handlePersonClick: (name: string | null) => void;
  personType: EnumPersonType;
  isPresentInTable?: boolean;
}

export const PersonLink: React.FC<PersonLinkProps> = (
  {
    person, handlePersonClick, personType, isPresentInTable = true,
  },
) => {
  const handleClick = () => {
    handlePersonClick(person[personType]);
  };

  return (
    <>
      {!isPresentInTable
        ? person[personType] || '-'
        : (
          <Link
            to={`/people/${person.slug}`}
            onClick={handleClick}
            className={classNames({
              'has-text-danger': (personType === EnumPersonType.Name
                && person.sex === 'f')
                || personType === EnumPersonType.MotherName,
            })}
          >
            {person[personType]}
          </Link>
        )}

    </>
  );
};
