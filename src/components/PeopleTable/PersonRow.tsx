import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { useEffect, useRef } from 'react';

type Props = { person: Person; selectedSlug?: string };

export const PersonRow = ({ person, selectedSlug }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isSelected = selectedSlug === person.slug;
  const { mother, father } = person;

  useEffect(() => {
    if (isSelected) {
      linkRef.current?.focus();
    }
  }, [isSelected]);

  return (
    <tr data-cy="person" className={cn(isSelected && 'has-background-warning')}>
      <td>
        <PersonLink
          ref={linkRef}
          slug={person.slug}
          name={person.name}
          sex={person.sex}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <PersonLink slug={mother.slug} name={mother.name} sex={mother.sex} />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink slug={father.slug} name={father.name} sex={father.sex} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
