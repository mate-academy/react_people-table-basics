import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person
}

export const PersonItem: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    mother,
    fatherName,
    father,
    slug,
  } = person;

  const { userSlug = '' } = useParams();

  const selectedTodo = userSlug === slug;

  return (
    <>
      <tr
        data-cy="person"
        className={classnames({ 'has-background-warning': selectedTodo })}
      >
        <td>
          <PersonLink
            sex={sex}
            slug={slug}
            name={name}
          />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother
            ? (
              <PersonLink
                sex={mother.sex}
                slug={mother.slug}
                name={mother.name}
              />
            )
            : motherName || '-'}
        </td>
        <td>
          {father
            ? (
              <PersonLink
                sex={father.sex}
                slug={father.slug}
                name={father.name}
              />
            )
            : fatherName || '-'}
        </td>
      </tr>

    </>
  );
};
