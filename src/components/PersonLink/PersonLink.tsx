import { useMemo } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[];
  handleSlugUser: (value: string) => void;
  isParent: 'no' | 'mother' | 'father'
};

export const PersonLink = ({
  person,
  handleSlugUser,
  people,
  isParent,
}:Props) => {
  const findPerson = useMemo(() => {
    if (isParent === 'no') {
      return person;
    }

    let parent = people.find(one => one.name === person.motherName);

    if (isParent === 'father') {
      parent = people.find(one => one.name === person.fatherName);
    }

    if (!parent) {
      return person;
    }

    return parent;
  }, []);

  return (
    <a
      className={findPerson.sex === 'f'
        ? 'has-text-danger'
        : ''}
      href={`#/people/${findPerson.slug}`}
      onClick={() => {
        return handleSlugUser(findPerson.slug);
      }}
    >
      {findPerson.name}
    </a>
  );
};
