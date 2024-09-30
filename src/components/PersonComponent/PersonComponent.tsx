import React, { FC } from 'react';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PersonComponent: FC<Props> = ({ people }) => {
  const findPersonByName = (name: string | undefined) => {
    return people.find(person => person.name === name) || null;
  };

  const actualSlug = useParams().slug;

  const getPersonClassNames = (slug: string) =>
    classNames({
      'has-background-warning': slug === actualSlug,
    });

  return (
    <>
      {people.map(person => {
        const { sex, born, died, motherName, fatherName, slug } = person;

        const mother = findPersonByName(motherName || undefined);
        const father = findPersonByName(fatherName || undefined);

        return (
          <tr
            key={slug}
            data-cy="person"
            className={getPersonClassNames(person.slug)}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{sex === 'f' ? 'f' : 'm'}</td>
            <td>{born}</td>
            <td>{died || '-'}</td>
            <td>
              {mother ? <PersonLink person={mother} /> : motherName || '-'}
            </td>
            <td>
              {father ? <PersonLink person={father} /> : fatherName || '-'}
            </td>
          </tr>
        );
      })}
    </>
  );
};
