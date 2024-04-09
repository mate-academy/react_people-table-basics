import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

type PersonLinkProps = {
  person: Person & {
    motherNameLink: string | null;
    fatherNameLink: string | null;
  };
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person: currentPerson,
}) => {
  const { personId } = useParams();
  const renderPersonName = (person: Person) => {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === Sex.Female,
        })}
      >
        {person.name}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      key={currentPerson.slug}
      className={classNames({
        'has-background-warning': personId === currentPerson.slug,
      })}
    >
      <td>{renderPersonName(currentPerson)}</td>
      <td>{currentPerson.sex}</td>
      <td>{currentPerson.born}</td>
      <td>{currentPerson.died}</td>
      <td>
        {currentPerson.motherName ? (
          currentPerson.motherNameLink ? (
            <Link
              className="has-text-danger"
              to={`/people/${currentPerson.motherNameLink}`}
            >
              {currentPerson.motherName}
            </Link>
          ) : (
            <span>{currentPerson.motherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {currentPerson.fatherNameLink ? (
          <Link to={`/people/${currentPerson.fatherNameLink}`}>
            {currentPerson.fatherName}
          </Link>
        ) : (
          <span>{currentPerson.fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
