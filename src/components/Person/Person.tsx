import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonType } from '../../types';
import { UserLink } from '../UserLink';

interface PersonProps {
  person: PersonType;
  mom: PersonType | null;
  dad: PersonType | null
}

export const Person: FC<PersonProps> = ({
  person,
  mom,
  dad,
}) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;
  const { slug: userId = '' } = useParams();
  const isSelected = slug === userId;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <UserLink
          title={name}
          sex={sex}
          path={slug}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mom
          ? (
            <UserLink
              title={mom.name}
              path={mom.slug}
              sex={mom.sex}
            />
          )
          : motherName || '-'}
      </td>
      <td>
        {dad
          ? (
            <UserLink
              path={dad.slug}
              sex={dad.sex}
              title={dad.name}
            />
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
