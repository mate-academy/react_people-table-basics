import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  getParentSlug: (parentName: string) => string | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, getParentSlug }) => {
  const { name, sex, born, died, motherName, fatherName } = person;
  const { slug } = useParams();

  const isFemale = () => {
    return sex === 'f';
  };

  const isSelectedRow = () => {
    return person.slug === slug;
  };

  const getFatherSlug = () => {
    if (fatherName) {
      return getParentSlug(fatherName);
    }

    return;
  };

  const getMotherSlug = () => {
    if (motherName) {
      return getParentSlug(motherName);
    }

    return;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelectedRow() })}
      key={person.slug}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': isFemale() })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherName && getMotherSlug() ? (
        <td>
          <Link
            to={`/people/${getMotherSlug()}`}
            className={classNames({ 'has-text-danger': motherName })}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      {fatherName && getFatherSlug() ? (
        <td>
          <Link to={`/people/${getFatherSlug()}`}>{fatherName}</Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
