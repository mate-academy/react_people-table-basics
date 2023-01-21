import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = React.memo(
  ({ person }) => {
    const { slug } = useParams();

    const handleClickScroll = useCallback((personSlug: string) => {
      const selectedPerson = document.getElementById(personSlug);

      if (selectedPerson) {
        selectedPerson.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, []);

    return (
      <tr
        id={person.slug}
        data-cy="person"
        className={cn(
          { 'has-background-warning': person.slug === slug },
        )}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        <td>
          {
            person.mother
              ? (
                <PersonLink
                  person={person.mother}
                  onScroll={handleClickScroll}
                />
              )
              : person.motherName || '-'
          }
        </td>

        <td>
          {
            person.father
              ? (
                <PersonLink
                  person={person.father}
                  onScroll={handleClickScroll}
                />
              )
              : person.fatherName || '-'
          }
        </td>
      </tr>
    );
  },
);
