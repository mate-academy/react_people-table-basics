import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { usePeopleState } from '../store/PeopleContext';

import { Person } from '../types';

export const People: React.FC = () => {
  const { people } = usePeopleState();

  const { pathname } = useLocation();

  const getSlugByName = (name: string) => {
    const human = people.find((person: Person) => person.name === name);

    return human?.slug || null;
  };

  const setNameColor = (sex: string) => {
    if (null) {
      return;
    }

    return cn({
      'has-text-danger': sex === 'f',
      'has-text-success': sex === 'm',
    });
  };

  return (
    <>
      {people.map((person: Person) => {
        const { name, sex, born, died, motherName, fatherName, slug } = person;

        const motherSlug = motherName ? getSlugByName(motherName) : null;

        const fatherSlug = fatherName ? getSlugByName(fatherName) : null;

        return (
          <tr
            key={Math.random()}
            data-cy="person"
            className={cn({
              'has-background-warning': slug === pathname.slice(8),
            })}
          >
            <td>
              <Link to={`/people/${slug}`} className={setNameColor(sex)}>
                {name}
              </Link>
            </td>

            <td>{sex}</td>

            <td>{born}</td>

            <td>{died}</td>

            <td>
              {motherSlug ? (
                <Link
                  to={`/people/${motherSlug}`}
                  className={setNameColor('f')}
                >
                  {motherName}
                </Link>
              ) : (
                <p>{motherName ? motherName : '-'}</p>
              )}
            </td>

            <td>
              {fatherSlug ? (
                <Link
                  to={`/people/${fatherSlug}`}
                  className={setNameColor('m')}
                >
                  {fatherName}
                </Link>
              ) : (
                <p>{fatherName ? fatherName : '-'}</p>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
};
