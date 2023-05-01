import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { getParents } from '../helpers';

type Props = {
  people: Person[];
  currentPerson: Person;
  selectedSlug: string;
};

export const CurrentPerson: React.FC<Props> = ({
  people,
  currentPerson,
  selectedSlug,
}) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = currentPerson;

  const mothers = getParents(people, 'mother');
  const fathers = getParents(people, 'father');

  const backgroundColor = selectedSlug === slug;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({ 'has-background-warning': backgroundColor })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          style={{
            color: sex === 'm' ? 'blue' : 'red',
          }}
        >
          {name}
        </Link>
      </td>
      <td>
        {sex}
      </td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mothers.includes(motherName)
          ? (
            <Link
              to={`/people/${people.find(p => p.name === motherName)?.slug}`}
              style={{
                color: mothers.includes(motherName)
                  ? 'red'
                  : 'black',
              }}
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {fathers.includes(fatherName)
          ? (
            <Link
              to={`/people/${people.find(p => p.name === fatherName)?.slug}`}
              style={{
                color: fathers.includes(fatherName)
                  ? 'blue'
                  : 'black',
              }}
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
