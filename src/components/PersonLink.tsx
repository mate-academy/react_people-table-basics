import { Person } from '../types';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
}) => {
  const { sex, name, slug } = person;

  return (
    <a
      className={sex === 'f'
        ? 'has-text-danger'
        : ''}
      href={`#/people/${slug}`}
    >
      {name}
    </a>
  );
};
