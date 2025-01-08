import { useNavigate } from 'react-router-dom';

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
}

const PersonLink: React.FC<{
  name: string;
  person?: Person;
}> = ({ name, person }) => {
  const navigate = useNavigate();

  if (!person) {
    return <span>{name}</span>;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(
      `/people/${name.replaceAll(' ', '-').toLowerCase()}-${person.born}`,
    );
  };

  return (
    <a
      href={`#/people/${name.replaceAll(' ', '-').toLowerCase()}-${person.born}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={handleClick}
    >
      {name}
    </a>
  );
};

export default PersonLink;
