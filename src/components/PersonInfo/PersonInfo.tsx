import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
  selectedPerson: string;
  setSelectedPerson: (slug: string) => void;
}

export const PersonInfo: React.FC<Props> = ({
  person,
  selectedPerson,
  setSelectedPerson,
}) => {
  const {
    name,
    born,
    died,
    sex,
    slug,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === selectedPerson })}
    >
      <td>
        <Link
          to={slug}
          className={cn({ 'has-text-danger': sex === 'f' })}
          onClick={() => {
            setSelectedPerson(slug);
          }}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {
        mother
          ? (
            <td
              className={cn({ 'has-text-danger': mother.sex === 'f' })}
            >
              <Link
                to={slug}
                onClick={() => {
                  setSelectedPerson(mother.slug);
                }}
              >
                {motherName}
              </Link>
            </td>
          ) : (
            <td>
              {motherName || '-'}
            </td>
          )
      }
      {
        father
          ? (
            <td>
              <Link
                to={slug}
                onClick={() => {
                  setSelectedPerson(father.slug);
                }}
              >
                {fatherName}
              </Link>
            </td>
          ) : (
            <td>
              {fatherName || '-'}
            </td>
          )
      }
    </tr>
  );
};
