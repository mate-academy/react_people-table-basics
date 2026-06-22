import { Person } from './types';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonLink = ({ people, person }: Props) => {
  if (!person) {
    return <span>-</span>;
  }

  const found = people.find(peopleFind => peopleFind.name === person.name);

  if (!found) {
    return <span>{person.name}</span>;
  }

  return (
    <a
      href={`#/people/${found.slug}`}
      className={found.sex === 'f' ? 'has-text-danger' : ''}
    >
      {found.name}
    </a>
  );
};
