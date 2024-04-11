import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import React from 'react';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  personId: string;
  people: Person[];
};

const FEMALE_SEX = 'f';

export const PeopleItem: React.FC<Props> = ({ person, personId, people }) => {
  const { motherName, fatherName, name, sex, born, died } = person;

  const isSelected = (human: Person) => human.slug === personId;

  const motherFind = people.find(
    ({ name: personName }) => personName === person.motherName,
  );

  const fatherFind = people.find(
    ({ name: personName }) => personName === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected(person),
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': sex === FEMALE_SEX,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherFind ? (
          <PersonLink person={motherName} slug={motherFind?.slug} sex={true} />
        ) : motherName ? (
          motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherFind ? (
          <PersonLink person={fatherName} slug={fatherFind?.slug} sex={false} />
        ) : fatherName ? (
          fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
