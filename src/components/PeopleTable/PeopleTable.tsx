import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { Gender } from '../../utils/sex';

type Props = {
  person: Person;
  slug?: string;
  motherSlug: string;
  fatherSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  person,
  slug,
  motherSlug,
  fatherSlug,
}) => {
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
            'has-text-danger': person.sex === Gender.Female,
          })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          motherSlug ? (
            <Link className="has-text-danger" to={`/people/${motherSlug}`}>
              {person.motherName}
            </Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          fatherSlug ? (
            <Link to={`/people/${fatherSlug}`}>{person.fatherName}</Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
