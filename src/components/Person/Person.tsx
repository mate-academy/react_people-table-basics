import { FC } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person as PersonType } from '../../types';

type Props = {
  person: PersonType,
  findMotherSlug: string | undefined,
  findFatherSlug: string | undefined,
};

export const Person: FC<Props> = ({
  person,
  findMotherSlug,
  findFatherSlug,

}) => {
  const { peopleId } = useParams();

  const motherName = person.motherName ? person.motherName : '-';
  const fatherName = person.fatherName ? person.fatherName : '-';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': peopleId === person.slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {findMotherSlug
          ? (
            <Link
              to={`../${findMotherSlug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )
          : motherName}
      </td>
      <td>
        {findFatherSlug
          ? (
            <Link
              to={`../${findFatherSlug}`}
            >
              {fatherName}
            </Link>
          )
          : fatherName}
      </td>
    </tr>
  );
};
