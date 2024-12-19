import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  people: Person[];
}

const findPersonByName = (name: string | null, peopleList: Person[]) => {
  return peopleList.find(value => value.name === name);
};

const emptyField = '-';

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug: slugValue } = useParams();
  const { slug, name, sex, born, died, motherName, fatherName } = person;
  const motherSlug = findPersonByName(motherName, people);
  const fatherSlug = findPersonByName(fatherName, people);

  return (
    <tr
      data-cy="person"
      id={slug}
      className={classNames({ 'has-background-warning': slugValue === slug })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherSlug ? (
          <Link className="has-text-danger" to={`../${motherSlug.slug}`}>
            {motherName}
          </Link>
        ) : (
          motherName || emptyField
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link to={`../${fatherSlug.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || emptyField
        )}
      </td>
    </tr>
  );
};
