import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  selectedPersonSlug: string;
  people: Person[];
}

export const PersonModal: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  people,
}) => {
  const {
    slug, sex, name, died, born, motherName, fatherName,
  } = person;

  let motherLink = null;

  if (motherName) {
    const motherPerson = people.find((p) => p.name === motherName);

    if (motherPerson) {
      motherLink = (
        <Link
          to={`/people/${motherPerson.slug}`}
          className="has-text-danger"
        >
          {motherName}
        </Link>
      );
    } else {
      motherLink = motherName;
    }
  } else {
    motherLink = '-';
  }

  let fatherLink = null;

  if (fatherName) {
    const fatherPerson = people.find((p) => p.name === fatherName);

    if (fatherPerson) {
      fatherLink = (
        <Link to={`/people/${fatherPerson.slug}`}>{fatherName}</Link>
      );
    } else {
      fatherLink = fatherName;
    }
  } else {
    fatherLink = '-';
  }

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
      <td>{motherLink}</td>
      <td>{fatherLink}</td>
    </tr>
  );
};
