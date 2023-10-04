import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person,
  motherSlug: string | undefined,
  fatherSlug: string | undefined,
  slug: string | undefined,
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  motherSlug,
  fatherSlug,
  slug,
}) => {
  let motherContent;

  if (motherSlug) {
    motherContent = (
      <Link to={`/people/${motherSlug}` as string} className="has-text-danger">
        {person.motherName}
      </Link>
    );
  } else if (person.motherName) {
    motherContent = person.motherName;
  } else {
    motherContent = '-';
  }

  let fatherContent;

  if (fatherSlug) {
    fatherContent = (
      <Link to={`/people/${fatherSlug}` as string}>
        {person.fatherName}
      </Link>
    );
  } else if (person.fatherName) {
    fatherContent = person.fatherName;
  } else {
    fatherContent = '-';
  }

  return (

    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherContent}
      </td>
      <td>
        {fatherContent}
      </td>
    </tr>

  );
};
