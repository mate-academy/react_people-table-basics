import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  father?: Person;
  fatherName: string;
}

export const FatherName = ({ father, fatherName }: Props) => {
  return (
    <>
      {father ? (
        <Link to={`/people/${father.slug}`}>{father.name}</Link>
      ) : (
        fatherName
      )}
    </>
  );
};
