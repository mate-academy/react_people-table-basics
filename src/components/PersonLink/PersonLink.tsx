import type { PersonLinkProps } from '../../types/PersonLinkProps';

export const PersonLink = ({ person, personName }: PersonLinkProps) => {
  if (person) {
    const isFemale = person.sex === 'f';

    return (
      <a
        href={`#/people/${person.slug}`}
        className={isFemale ? 'has-text-danger' : ''}
      >
        {person.name}
      </a>
    );
  }

  if (personName) {
    return <span>{personName}</span>;
  }

  return null;
};
