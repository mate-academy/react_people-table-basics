import { Link } from 'react-router-dom';

type Props = {
  person: {
    name: string;
    slug: string | undefined;
    sex: string;
  };
};

export function PersonLink({ person }: Props) {
  return (
    <td>
      {person.slug ? (
        <Link
          to={person.slug}
          className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
        >
          {person.name}
        </Link>
      ) : (
        person.name
      )}
    </td>
  );
}
