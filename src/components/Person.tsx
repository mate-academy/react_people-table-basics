import classnames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({
  person,
  people,
}) => {
  const motherNameFound = people.find(
    element => element.name === person.motherName,
  );
  const fatherNameFound = people.find(
    element => element.name === person.fatherName,
  );

  const { slug: selectedSlug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classnames(
        { 'has-background-warning': person.slug === selectedSlug },
      )}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classnames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherNameFound
          ? (
            <Link
              to={`../${motherNameFound.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )
          : person.motherName || '-'}
      </td>

      <td>
        {fatherNameFound
          ? (
            <Link to={`../${fatherNameFound.slug}`} className="">
              {person.fatherName}
            </Link>
          )
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
