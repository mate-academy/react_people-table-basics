import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    sex,
    slug,
    name,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { slug: selectedPersonSlug = '' } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPersonSlug,
      })}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother
        ? (
          <td>
            <a
              className="has-text-danger"
              href={`#/people/${mother.slug}`}
            >
              {mother.name}
            </a>
          </td>
        ) : (
          <td>{motherName || '-'}</td>
        )}

      {father
        ? (
          <td>
            <a
              href={`#/people/${father.slug}`}
            >
              {father.name}
            </a>
          </td>
        ) : (
          <td>{fatherName || '-'}</td>
        )}
    </tr>
  );
};
