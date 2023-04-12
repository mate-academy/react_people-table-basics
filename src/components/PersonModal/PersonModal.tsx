import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  selectedPersonSlug: string;
  people: Person[];
}

interface MotherLinkProps {
  motherName: string | null;
  people: Person[];
}

const MotherLink: React.FC<MotherLinkProps> = ({ motherName, people }) => {
  if (!motherName) {
    return <>-</>;
  }

  const motherPerson = people.find((p) => p.name === motherName);

  if (motherPerson) {
    return (
      <Link
        to={`/people/${motherPerson.slug}`}
        className="has-text-danger"
      >
        {motherName}
      </Link>
    );
  }

  return <>{motherName}</>;
};

interface FatherLinkProps {
  fatherName: string | null;
  people: Person[];
}

const FatherLink: React.FC<FatherLinkProps> = ({ fatherName, people }) => {
  if (!fatherName) {
    return <>-</>;
  }

  const fatherPerson = people.find((p) => p.name === fatherName);

  if (fatherPerson) {
    return (
      <Link
        to={`/people/${fatherPerson.slug}`}
      >
        {fatherName}
      </Link>
    );
  }

  return <>{fatherName}</>;
};

export const PersonModal: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  people,
}) => {
  const {
    slug, sex, name, died, born, motherName, fatherName,
  } = person;

  const tableRowClasses = classNames({
    'has-background-warning': selectedPersonSlug === slug,
  });

  const linkClasses = classNames({
    'has-text-danger': sex === 'f',
  });

  return (
    <tr data-cy="person" className={tableRowClasses}>
      <td>
        <Link to={`/people/${slug}`} className={linkClasses}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td><MotherLink people={people} motherName={motherName} /></td>
      <td><FatherLink people={people} fatherName={fatherName} /></td>
    </tr>
  );
};
