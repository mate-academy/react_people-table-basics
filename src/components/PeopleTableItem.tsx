import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person,
  people: Person[],
}

export const PeopleTableItem: FC<Props> = ({ person, people }) => {
  const { personSlug = '' } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const isPersonSelected = personSlug === slug;

  const foundMotherInPeople = people.find(p => p.name === motherName) || null;
  const foundFatherInPeople = people.find(p => p.name === fatherName) || null;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isPersonSelected })}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {foundMotherInPeople
        ? (
          <td>
            <a
              href={`#/people/${foundMotherInPeople.slug}`}
              className={cn(
                { 'has-text-danger': (foundMotherInPeople.sex === 'f') },
              )}
            >
              {motherName}
            </a>
          </td>
        ) : (
          <td>{motherName || '-'}</td>
        )}
      {foundFatherInPeople
        ? (
          <td>
            <a
              href={`#/people/${foundFatherInPeople.slug}`}
            >
              {fatherName}
            </a>
          </td>
        ) : (
          <td>{fatherName || '-'}</td>
        )}
    </tr>
  );
};
