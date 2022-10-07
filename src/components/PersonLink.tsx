import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  findPeopleParent: (name: string | null) => Person | null;
};

export const PersonLink: React.FC<Props> = ({ person, findPeopleParent }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  return (
    <>
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames('', { 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {
          findPeopleParent(motherName)
            ? (
              <Link
                className="has-text-danger"
                to={`/people/${findPeopleParent(motherName)?.slug}`}
              >
                {motherName}
              </Link>
            )
            : (motherName || '-')
        }
      </td>
      <td>
        {
          findPeopleParent(fatherName)
            ? (
              <Link
                to={`/people/${findPeopleParent(fatherName)?.slug}`}
              >
                {fatherName}
              </Link>
            )
            : (fatherName || '-')
        }
      </td>
    </>
  );
};
