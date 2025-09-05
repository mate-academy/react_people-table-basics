import { Link } from 'react-router-dom';

type Props = {
  person: {
    name: string;
    slug: string;
    sex: string;
  };
};

export function PersonLink({ person }: Props) {
  return (
    <Link
      to={person.slug}
      className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
    >
      {person.name}
    </Link>
  );
}
