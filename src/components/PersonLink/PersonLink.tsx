import { Link } from 'react-router-dom';
import { PersonProps } from '../../types';

interface Props {
  person: PersonProps
}

export default function PersonLink({ person }: Props) {
  const { slug, sex, name } = person;

  return (
    <Link
      to={slug}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
}
