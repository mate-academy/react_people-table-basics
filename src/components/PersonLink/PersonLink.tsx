import { Link } from 'react-router-dom';

type Props = {
  slug: string;
  name: string;
};

export const PersonLink = ({ slug, name }: Props) => {
  return <Link to={`/people/${slug}`}>{name}</Link>;
};
