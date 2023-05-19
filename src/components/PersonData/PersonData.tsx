import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PersonData: FC<Props> = ({ person }) => {
  const { selectedSlug = '' } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const getParentLayout = (
    parentName: string | null,
    parent?: Person,
  ) => (
    parent ? (
      <PersonLink
        name={parent.name}
        sex={parent.sex}
        slug={parent.slug}
      />
    ) : (
      parentName || '-'
    )
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <PersonLink
          name={name}
          sex={sex}
          slug={slug}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {getParentLayout(motherName, mother)}
      </td>

      <td>
        {getParentLayout(fatherName, father)}
      </td>
    </tr>
  );
};
