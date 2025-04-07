import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  mother?: Person;
  motherName: string;
}

export const MotherName = ({ mother, motherName }: Props) => {
  return (
    <>
      {mother ? (
        <Link className="has-text-danger" to={`/people/${mother.slug}`}>
          {mother.name}
        </Link>
      ) : (
        motherName
      )}
    </>
  );
};
